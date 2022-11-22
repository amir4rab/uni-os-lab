import Gantt from '../../../types/gantt';
import ProcessArray, { Process } from '../../../types/process';
import ProcessResult from '../../../types/process-results';

import { sortProcessesByArrivalTime } from '../helpers';

const getPrioritizationScoreConf: {
  cpuBurstMultiplier: number;
  ioBurstMultiplier: number;
} = {
  cpuBurstMultiplier: 1,
  ioBurstMultiplier: 1,
};

/** Calculates Process Prioritization score */
const getPrioritizationScore = (process: Process, conf= getPrioritizationScoreConf) => {
  const { cpuBursts, ioBursts } = process;
  const { cpuBurstMultiplier, ioBurstMultiplier } = conf;

  let score = 0;

  if ( cpuBursts === 'short' ) score += cpuBurstMultiplier;
  if ( ioBursts === 'high' ) score += ioBurstMultiplier;

  return score;
}

const multiLevelFeedbackQueue = (processes: ProcessArray): ProcessResult => {
  const sortedProcesses = sortProcessesByArrivalTime(processes);

  // Results variables
  const gantt: Gantt = [];
  let averageReturnTime = 0;
  let averageResponseTime = 0;

  // Processing variables
  const seen = new Array(sortedProcesses.length).fill(false, 0, sortedProcesses.length - 1);
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
      if ( processes[i].arrivalTime > currentTime ) continue;

      const currItemScore= getPrioritizationScore(processes[i]);
      const selectedItemScore= getPrioritizationScore(processes[selectedItem]);

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

    averageReturnTime += currentTime + duration - arrivalTime;
    averageResponseTime += currentTime - arrivalTime;
    currentTime += duration;

    seen[selectedItem] = true;
  }

  averageResponseTime = parseFloat(
    (averageResponseTime / sortedProcesses.length).toFixed(2),
  );
  averageReturnTime = parseFloat(
    (averageReturnTime / sortedProcesses.length).toFixed(2),
  );

  return {
    gantt,
    averageReturnTime,
    averageResponseTime,
  };
};

export default multiLevelFeedbackQueue;