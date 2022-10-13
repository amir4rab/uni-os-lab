import Gantt from '../types/gannt';
import ProcessArray from '../types/process';
import ProcessResult from '../types/process-results';
import SchedulingAlgorithm from '../types/scheduling-algorithm';

interface Props {
  algorithm: SchedulingAlgorithm;
  processes: ProcessArray;
}

const defaultResult: ProcessResult = {
  averageResponseTime: 0,
  averageReturnTime: 0,
  gantt: [],
};

/** Sorts processes array based on processes insertion time **/
const sortProcessesByInsertionTime = (processes: ProcessArray) =>
  processes.sort(({ insertionTime: aIn }, { insertionTime: bIn }) =>
    aIn < bIn ? -1 : aIn === bIn ? 0 : 1,
  );

/** Processes an array of processes with first come, first serve algorithm */
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

/** Processes an array of processes with Shortest job first algorithm */
const sjf = (processes: ProcessArray): ProcessResult => {
  const pArray = sortProcessesByInsertionTime(processes);

  // loop variables
  let currentTime = pArray[0].insertionTime;
  let completedItems = ([] as boolean[]).fill(false, 0, pArray.length - 1);

  // results
  const gantt: Gantt = [];
  let averageReturnTime = 0;
  let averageResponseTime = 0;

  for (let _ = 0; _ < pArray.length; _++) {
    let smallestItemIndex = -1;
    for (let j = 0; j < pArray.length; j++) {
      // Adding the first process to the comparison
      if (smallestItemIndex === -1 && !completedItems[j]) {
        smallestItemIndex = j;

        // Incase next process insertion time is later than current time we have to skip to that point in timeline
        if (pArray[j].insertionTime > currentTime) {
          currentTime = pArray[j].insertionTime;
        }
        continue;
      } else if (smallestItemIndex === -1) continue;

      // Checking if there is no more available processes in that time
      if (pArray[j].insertionTime > currentTime) break;

      // Incase there is a shorter process, setting that is the smallest one
      if (
        !completedItems[j] &&
        pArray[smallestItemIndex].duration > pArray[j].duration
      ) {
        smallestItemIndex = j;
        continue;
      }
    }

    // Incase we couldn't find any items, there are some error in our algorithm
    if (smallestItemIndex === -1) {
      console.error('Something went wrong');
      return defaultResult;
    }

    // Adding the smallest process to the Gantt Array
    gantt.push({
      startTime: currentTime,
      endTime: currentTime + pArray[smallestItemIndex].duration,
      id: pArray[smallestItemIndex].id,
      processName: pArray[smallestItemIndex].name,
    });

    // Updating other result variables
    averageReturnTime +=
      currentTime +
      pArray[smallestItemIndex].duration -
      pArray[smallestItemIndex].insertionTime;
    averageResponseTime +=
      currentTime - pArray[smallestItemIndex].insertionTime;

    // Updating loop variables
    currentTime += pArray[smallestItemIndex].duration;
    completedItems[smallestItemIndex] = true;
  }

  averageReturnTime = parseFloat(
    (averageReturnTime / pArray.length).toFixed(2),
  );
  averageResponseTime = parseFloat(
    (averageResponseTime / pArray.length).toFixed(2),
  );

  return {
    averageResponseTime,
    averageReturnTime,
    gantt,
  };
};

// const roundRobin = (processes: ProcessArray): Result => {};
// const priority = (processes: ProcessArray): Result : Result=> {};

/**
 * A hook to processes, processes data
 */
const useAlgorithm = () => {
  /**
   * Processes an array of processes and return Gantt chart data and other related data
   */
  const process = ({ algorithm, processes }: Props) => {
    switch (algorithm) {
      case 'fcfs':
        return fcfs([...processes]);
      case 'sjf':
        return sjf([...processes]);
      // case 'priority':
      //   return roundRobin(processes);
      // case 'round-robin':
      //   return priority(processes);
      default:
        return defaultResult;
    }
  };

  return {
    process,
  };
};

export default useAlgorithm;
