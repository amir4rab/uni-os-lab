import Gantt from '../../../types/gantt';
import ProcessArray from '../../../types/process';
import ProcessResult from '../../../types/process-results';

import { sortProcessesByArrivalTime } from '../helpers';

const defaultResult: ProcessResult = {
  averageResponseTime: 0,
  averageReturnTime: 0,
  gantt: [],
};

/** Processes an array of processes with Shortest job first algorithm */
const sjf = (processes: ProcessArray): ProcessResult => {
  const pArray = sortProcessesByArrivalTime(processes);

  // loop variables
  let currentTime = pArray[0].arrivalTime;
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
        if (pArray[j].arrivalTime > currentTime) {
          currentTime = pArray[j].arrivalTime;
        }
        continue;
      } else if (smallestItemIndex === -1) continue;

      // Checking if there is no more available processes in that time
      if (pArray[j].arrivalTime > currentTime) break;

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
      pArray[smallestItemIndex].arrivalTime;
    averageResponseTime += currentTime - pArray[smallestItemIndex].arrivalTime;

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

export default sjf