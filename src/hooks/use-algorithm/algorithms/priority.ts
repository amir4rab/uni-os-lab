import type Gantt from '../../../types/gantt';
import type ProcessArray from '../../../types/process';
import type ProcessResult from '../../../types/process-results';

import { findNextPrioritizedItemNonPreemptive as findNextPrioritizedItem } from '../helpers/priority';

const priority = (processes: ProcessArray): ProcessResult => {
  // Results variables
  const gantt: Gantt = [];
  let averageTurnaroundTime = 0;
  let averageWaitingTime = 0;

  // Processing variables
  const seen = (new Array(processes.length) as boolean[]).fill(
    false,
    0,
    processes.length,
  );
  let currentTime = 0;

  for (let _ = 0; _ < processes.length; _++) {
    let selectedItem = findNextPrioritizedItem(processes, seen, currentTime);

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
    (averageWaitingTime / processes.length).toFixed(2),
  );
  averageTurnaroundTime = parseFloat(
    (averageTurnaroundTime / processes.length).toFixed(2),
  );

  return {
    averageWaitingTime,
    averageTurnaroundTime,
    gantt,
  };
};

export default priority;
