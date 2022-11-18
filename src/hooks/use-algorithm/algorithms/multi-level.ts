import Gantt from '../../../types/gannt';
import ProcessArray from '../../../types/process';
import ProcessResult from '../../../types/process-results';

import { sortProcessesByArrivalTime } from '../helpers';

const multiLevel = (processes: ProcessArray): ProcessResult => {
  const sortedProcesses = sortProcessesByArrivalTime(processes);

  // Results variables
  const gantt: Gantt = [];
  let averageReturnTime = 0;
  let averageResponseTime = 0;

  // Processing variables
  const seen = new Array(sortedProcesses.length).fill(false, 0, sortedProcesses.length - 1);
  let currentTime = 0;

  for (let _ = 0; _ < sortedProcesses.length; _++) {
    let nextItem = -1;
    let readyToExecuteBackgroundProcess = -1;
    let noProcessExecuted = true;

    for (let i = 0; i < sortedProcesses.length; i++) {
      if (seen[i]) continue;

      if (nextItem === -1) nextItem = i;

      // Executing next item, in case we have a time gap with the next process
      if (
        nextItem !== -1 &&
        sortedProcesses[i].arrivalTime > currentTime &&
        readyToExecuteBackgroundProcess === -1
      ) {
        const { arrivalTime, duration, id, name } = sortedProcesses[nextItem];
        currentTime = arrivalTime;
        seen[nextItem] = true;

        gantt.push({
          id,
          endTime: currentTime + duration,
          startTime: currentTime,
          processName: name,
        });

        currentTime += duration;
        averageReturnTime = currentTime - arrivalTime;
        averageResponseTime = currentTime - arrivalTime + duration;
        noProcessExecuted = false;

        break;
      }

      // Executing ready foreground task
      if (
        sortedProcesses[i].type === 'foreground' &&
        sortedProcesses[i].arrivalTime <= currentTime
      ) {
        seen[i] = true;
        const { arrivalTime, duration, id, name } = sortedProcesses[i];

        gantt.push({
          id,
          endTime: currentTime + duration,
          startTime: currentTime,
          processName: name,
        });

        averageReturnTime += currentTime - arrivalTime + duration;
        averageResponseTime += currentTime - arrivalTime;
        currentTime += duration;
        noProcessExecuted = false;

        break;
      }

      // Caching next background process for execution
      if (
        readyToExecuteBackgroundProcess === -1 &&
        sortedProcesses[i].type === 'background' &&
        sortedProcesses[i].arrivalTime <= currentTime
      ) {
        readyToExecuteBackgroundProcess = i;
      }
    }

    // Incase there was a cached background task we will execute it now
    if (readyToExecuteBackgroundProcess !== -1 && noProcessExecuted) {
      seen[readyToExecuteBackgroundProcess] = true;

      const { arrivalTime, duration, id, name } =
        sortedProcesses[readyToExecuteBackgroundProcess];

      gantt.push({
        id,
        endTime: currentTime + duration,
        startTime: currentTime,
        processName: name,
      });

      averageReturnTime += currentTime - arrivalTime + duration;
      averageResponseTime += currentTime - arrivalTime;
      currentTime += duration;
    }
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

export default multiLevel;