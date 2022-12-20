import type Gantt from '../../../types/gantt';
import type { Process, default as ProcessArray } from '../../../types/process';
import type ProcessResult from '../../../types/process-results';

const getQueueLevel = (process: Process, currentLevel: number): number => {
  const { type } = process;

  if (type === 'foreground' && currentLevel >= 2) return currentLevel;

  return currentLevel + 1;
};

const maxLoopCount = 1_000;

const multiLevel = (
  processes: ProcessArray,
  timeSlice: number,
): ProcessResult => {
  // Results variables
  const gantt: Gantt = [];
  let averageTurnaroundTime = 0;
  let averageWaitingTime = 0;

  // Processing variables
  const reminders: (number | null)[] = new Array(processes.length).fill(
    null,
    0,
    processes.length,
  );
  const processQueueLevel: number[] = new Array(processes.length).fill(
    1,
    0,
    processes.length,
  );
  const processLoopCount: number[] = new Array(processes.length).fill(
    0,
    0,
    processes.length,
  );

  let currentTime = 0;
  let totalExecutionTime = 0;
  let totalArrivalTime = 0;
  let previouslyExecutedProcess = -1;

  for (let _ = 0; _ < maxLoopCount; _++) {
    let selectedItem = -1;

    // Loops throw the array to find the next process
    for (let i = 0; i < processes.length; i++) {
      // Settings variables incase this is the first loop of the selected processes
      if (reminders[i] === null) {
        // console.log(reminders[i]);
        const { duration, arrivalTime } = processes[i];

        reminders[i] = duration;
        totalArrivalTime += arrivalTime;
      } else if (reminders[i] === 0) {
        // Skipping incase that the item execution been completed before
        continue;
      }

      // Setting the first item
      if (selectedItem === -1) {
        selectedItem = i;
        continue;
      }

      // If the current item hasn't arrived yet
      if (processes[i].arrivalTime > currentTime) continue;

      // We compare items queue level to find the item which needs to be executed
      const currQueue = processQueueLevel[i];
      const currPLC = processLoopCount[i];

      const selectedItemQueue = processQueueLevel[selectedItem];
      const selectedPLC = processLoopCount[selectedItem];

      // Changing the item incase we found another item that is more prioritized or has been added before the current selected item
      if (
        processes[i].arrivalTime <= currentTime &&
        (currQueue < selectedItemQueue || currPLC < selectedPLC)
      ) {
        selectedItem = i;
        continue;
      }
    }

    // breaks incase there were no more processes
    if (selectedItem === -1) break;

    const {
      id,
      name,
      arrivalTime,
      duration: totalDuration,
    } = processes[selectedItem];
    const selectedItemQueue = processQueueLevel[selectedItem];
    let duration = reminders[selectedItem];

    if (typeof duration !== 'number') duration = totalDuration;

    // Pushing current time to  arrival time of the process, incase of time gap
    currentTime = currentTime > arrivalTime ? currentTime : arrivalTime;

    // Depending on processes queue we choose an algorithm to execute it:
    //    Queue 1) Round robin with time slice multiplied by 1
    //    Queue 2) Round robin with time slice multiplied by 2
    //    Queue 3) First in First Out

    let executedChunk: number = 0;
    let executionRemainer: number = 0;

    if (selectedItemQueue <= 2) {
      const queueTS = timeSlice * selectedItemQueue;
      console.log(queueTS, selectedItemQueue);

      executedChunk = duration < queueTS ? duration : queueTS;
      executionRemainer = duration - executedChunk;

      processQueueLevel[selectedItem] = getQueueLevel(
        processes[selectedItem],
        selectedItemQueue,
      );
    } else {
      executedChunk = duration;
      executionRemainer = 0;
    }

    // Pushing process info to gantt array
    gantt.push({
      startTime: currentTime,
      endTime: currentTime + executedChunk,
      id: id + currentTime,
      ogId: id,
      processName: name,
    });

    // Appending time average return time
    averageWaitingTime += currentTime + executedChunk;

    // Updating variables
    reminders[selectedItem] = executionRemainer;

    // Setting executed process to previously executed process
    previouslyExecutedProcess = selectedItem;

    processLoopCount[selectedItem] = processLoopCount[selectedItem] + 1;

    currentTime += executedChunk;
    totalExecutionTime += executedChunk;
  }

  // Shortcut to calculate average response time in Round Robin algorithm
  averageTurnaroundTime =
    averageWaitingTime - totalExecutionTime - totalArrivalTime;

  averageWaitingTime = parseFloat(
    (averageWaitingTime / processes.length).toFixed(2),
  );
  averageTurnaroundTime = parseFloat(
    (averageTurnaroundTime / processes.length).toFixed(2),
  );

  return {
    gantt,
    averageTurnaroundTime,
    averageWaitingTime,
  };
};

export default multiLevel;
