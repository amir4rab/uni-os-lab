import Gantt from '../types/gannt';
import ProcessArray from '../types/process';
import ProcessResult from '../types/process-results';
import SchedulingAlgorithm from '../types/scheduling-algorithm';

interface Props {
  algorithm: SchedulingAlgorithm;
  processes: ProcessArray;
}

/** Sorts processes array based on processes insertion time **/
const sortProcessesByInsertionTime = (processes: ProcessArray) =>
  processes.sort(({ insertionTime: aIn }, { insertionTime: bIn }) =>
    aIn < bIn ? -1 : aIn === bIn ? 0 : 1,
  );

const fcfs = (processes: ProcessArray): ProcessResult => {
  const sortedArray = sortProcessesByInsertionTime(processes);

  let startTime = 0;
  let averageReturnTime = 0;
  let averageResponseTime = 0;
  const gantt: Gantt = sortedArray.map(
    ({ duration, name, id, insertionTime }) => {
      if (startTime < insertionTime) startTime = insertionTime;

      const result = {
        endTime: startTime + duration,
        startTime: startTime,
        processName: name,
        id,
      };

      startTime += duration;
      averageReturnTime += result.endTime - insertionTime;
      averageResponseTime += result.startTime - insertionTime;

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
// const sjf = (processes: ProcessArray): Result => {};
// const roundRobin = (processes: ProcessArray): Result => {};
// const priority = (processes: ProcessArray): Result : Result=> {};

const useAlgorithm = () => {
  const process = ({ algorithm, processes }: Props) => {
    switch (algorithm) {
      case 'fcfs':
        return fcfs(processes);
      // case 'sjf':
      // return fcfs(processes);
      // case 'priority':
      //   return roundRobin(processes);
      // case 'round-robin':
      //   return priority(processes);
      default:
        return {
          gantt: [],
          averageResponseTime: 0,
          averageReturnTime: 0,
        };
    }
  };

  return {
    process,
  };
};

export default useAlgorithm;
