import type Gantt from '../../../types/gantt';
import type { Process, default as ProcessArray } from '../../../types/process';
import type ProcessResult from '../../../types/process-results';

import { sortProcessesByArrivalTime } from '../helpers';

const getPrioritizationScoreConf: {
  cpuBurstMultiplier: number;
  ioBurstMultiplier: number;
} = {
  cpuBurstMultiplier: 1,
  ioBurstMultiplier: 1,
};

/** Calculates Process Prioritization score */
const getPrioritizationScore = (
  process: Process,
  conf = getPrioritizationScoreConf,
) => {
  const { cpuBursts, ioBursts } = process;
  const { cpuBurstMultiplier, ioBurstMultiplier } = conf;

  let score = 0;

  if (cpuBursts === 'short') score += cpuBurstMultiplier;
  if (ioBursts === 'high') score += ioBurstMultiplier;

  return score;
};

const multiLevelFeedbackQueue = (processes: ProcessArray): ProcessResult => {
  const sortedProcesses = sortProcessesByArrivalTime(processes);

  // Results variables
  const gantt: Gantt = [];
  let averageTurnaroundTime = 0;
  let averageWaitingTime = 0;

  // Processing variables
  const seen = new Array(sortedProcesses.length).fill(
    false,
    0,
    sortedProcesses.length,
  );
  let currentTime = 0;

  for (let _ = 0; _ < sortedProcesses.length; _++) {
    let selectedItem = -1;
    for (let i = 0; i < processes.length; i++) {
      // Skipping incase that the item has been processed before
      if (seen[i]) continue;

      // Setting the first item
      if (selectedItem === -1) {
        selectedItem = i;
        continue;
      }

      // if the current item hasn't arrived yet
      if (processes[i].arrivalTime > currentTime) continue;

      const currItemScore = getPrioritizationScore(processes[i]);
      const selectedItemScore = getPrioritizationScore(processes[selectedItem]);

      // Changing the item incase we found another item that is more prioritized or has been added before the current selected item
      if (
        processes[i].arrivalTime <= processes[selectedItem].arrivalTime ||
        currItemScore < selectedItemScore
      ) {
        selectedItem = i;
        continue;
      }
    }

    if (selectedItem === -1) {
      break;
    }

    const { id, duration, name, arrivalTime } = processes[selectedItem];

    currentTime = currentTime > arrivalTime ? currentTime : arrivalTime;
    gantt.push({
      startTime: currentTime,
      endTime: currentTime + duration,
      id,
      processName: name,
    });

    averageTurnaroundTime += currentTime + duration - arrivalTime;
    averageWaitingTime += currentTime - arrivalTime;
    currentTime += duration;

    seen[selectedItem] = true;
  }

  averageWaitingTime = parseFloat(
    (averageWaitingTime / sortedProcesses.length).toFixed(2),
  );
  averageTurnaroundTime = parseFloat(
    (averageTurnaroundTime / sortedProcesses.length).toFixed(2),
  );

  return {
    gantt,
    averageTurnaroundTime,
    averageWaitingTime,
  };
};

export default multiLevelFeedbackQueue;
