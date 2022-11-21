import Gantt from '../../../types/gantt';
import ProcessArray from '../../../types/process';
import ProcessResult from '../../../types/process-results';

import { sortProcessesByArrivalTime } from '../helpers';

/** Processes an array of processes with first come, first serve algorithm */
const fcfs = (processes: ProcessArray): ProcessResult => {
  const sortedArray = sortProcessesByArrivalTime(processes);

  let startTime = 0;
  let averageReturnTime = 0;
  let averageResponseTime = 0;
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
      averageReturnTime += result.endTime - arrivalTime;
      averageResponseTime += result.startTime - arrivalTime;

      return result;
    },
  );

  averageReturnTime = parseFloat(
    (averageReturnTime / sortedArray.length).toFixed(2),
  );
  averageResponseTime = parseFloat(
    (averageResponseTime / sortedArray.length).toFixed(2),
  );

  return {
    gantt,
    averageResponseTime,
    averageReturnTime,
  };
};

export default fcfs;