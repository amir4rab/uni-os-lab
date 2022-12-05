import type Gantt from '../../../types/gantt';
import type ProcessArray from '../../../types/process';
import type ProcessResult from '../../../types/process-results';

import { findNextPrioritizedItemNonPreemptive as findNextPrioritizedItem } from '../helpers/priority';

const priority = (processes: ProcessArray): ProcessResult => {
  // Results variables
  const gantt: Gantt = [];
  let averageReturnTime = 0;
  let averageResponseTime = 0;

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

    averageReturnTime += currentTime + duration - arrivalTime;
    averageResponseTime += currentTime - arrivalTime;
    currentTime += duration;

    seen[selectedItem] = true;
  }

  averageResponseTime = parseFloat(
    (averageResponseTime / processes.length).toFixed(2),
  );
  averageReturnTime = parseFloat(
    (averageReturnTime / processes.length).toFixed(2),
  );

  return {
    averageResponseTime,
    averageReturnTime,
    gantt,
  };
};

export default priority;
