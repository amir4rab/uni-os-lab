import type Gantt from '../../../types/gantt';
import type ProcessArray from '../../../types/process';
import type ProcessResult from '../../../types/process-results';

import { sortProcessesByArrivalTime } from '../helpers';

/** Processes an array of processes with first come, first serve algorithm */
const fcfs = (processes: ProcessArray): ProcessResult => {
  const sortedArray = sortProcessesByArrivalTime(processes);

  let startTime = 0;
  let averageTurnaroundTime = 0;
  let averageWaitingTime = 0;
  const gantt: Gantt = sortedArray.map(
    ({ duration, name, id, arrivalTime }) => {
      if (startTime < arrivalTime) startTime = arrivalTime;

      const result = {
        endTime: startTime + duration,
        startTime: startTime,
        processName: name,
        id,
      };

      startTime += duration;
      averageTurnaroundTime += result.endTime - arrivalTime;
      averageWaitingTime += result.startTime - arrivalTime;

      return result;
    },
  );

  averageTurnaroundTime = parseFloat(
    (averageTurnaroundTime / sortedArray.length).toFixed(2),
  );
  averageWaitingTime = parseFloat(
    (averageWaitingTime / sortedArray.length).toFixed(2),
  );

  return {
    gantt,
    averageWaitingTime,
    averageTurnaroundTime,
  };
};

export default fcfs;
