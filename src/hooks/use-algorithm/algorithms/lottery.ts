import type Gantt from '../../../types/gantt';
import type ProcessArray from '../../../types/process';
import type ProcessResult from '../../../types/process-results';

const lottery = (processes: ProcessArray): ProcessResult => {
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
    let selectedItem = -1;

    for (let j = 0; j < processes.length; j++) {
      // Skipping incase that the item has been processed before
      if (seen[j]) continue;

      // Setting the first item
      if (selectedItem === -1) {
        selectedItem = j;
        continue;
      }

      // Changing the item incase we found another item that is more prioritized and has been added in same time or before the current selected item
      if (
        processes[j].arrivalTime < processes[selectedItem].arrivalTime &&
        processes[j].arrivalTime <= currentTime
      ) {
        selectedItem = j;
        continue;
      } else if (
        Math.random() < Math.random() &&
        processes[j].arrivalTime <= processes[selectedItem].arrivalTime
      ) {
        selectedItem = j;
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

export default lottery;
