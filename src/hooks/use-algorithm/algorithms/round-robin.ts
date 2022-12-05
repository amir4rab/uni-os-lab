import type Gantt from '../../../types/gantt';
import type ProcessArray from '../../../types/process';
import type ProcessResult from '../../../types/process-results';

import { sortProcessesByArrivalTime } from '../helpers';

const roundRobin = (
  processes: ProcessArray,
  timeSlice: number,
): ProcessResult => {
  // Results variables
  const gantt: Gantt = [];
  let averageReturnTime = 0;
  let averageResponseTime = 0;

  // Processing variables
  const copiedProcesses = JSON.parse(JSON.stringify({ processes }))
    .processes as ProcessArray;
  const sortedProcesses = sortProcessesByArrivalTime(copiedProcesses);
  let currentTime = sortedProcesses[0].arrivalTime;
  let seen = ([] as boolean[]).fill(false, 0, sortedProcesses.length - 1);
  let totalArrivalTime = 0;
  let totalProcessTime = 0;

  for (let _ = 0; _ < 1_000; _++) {
    let completed = true;

    let timeGap = true;
    let timeGapIndex = -1;

    for (let i = 0; i < sortedProcesses.length; i++) {
      const { arrivalTime, duration, id, name } = sortedProcesses[i];

      // Skipping current item incase it's completed
      if (duration > 0) {
        completed = false;
      } else {
        continue;
      }

      // Incase processes isn't arrived yet, and we got a time gap
      if (currentTime < arrivalTime) {
        if (timeGap) timeGapIndex = i;
        break;
      } else {
        timeGap = false;
      }

      // Incase it's the first visit to the current item
      if (!seen[i]) {
        seen[i] = true;
        totalArrivalTime += arrivalTime;
        totalProcessTime += duration;
      }

      const remindedDuration = timeSlice > duration ? 0 : duration - timeSlice;

      // Incase process ended in the current loop
      if (remindedDuration === 0 && duration !== 0) {
        averageResponseTime += currentTime + duration;
      }

      gantt.push({
        startTime: currentTime,
        endTime: currentTime + (timeSlice > duration ? duration : timeSlice),
        id: id + currentTime,
        ogId: id,
        processName: name,
      });
      sortedProcesses[i].duration = remindedDuration;
      currentTime += timeSlice > duration ? duration : timeSlice;
    }

    if (timeGap && timeGapIndex !== -1) {
      currentTime = sortedProcesses[timeGapIndex].arrivalTime;
    }

    if (completed) break;
  }

  // Shortcut to calculate average response time in Round Robin algorithm
  averageReturnTime = averageResponseTime - totalProcessTime - totalArrivalTime;

  averageResponseTime = parseFloat(
    (averageResponseTime / sortedProcesses.length).toFixed(2),
  );
  averageReturnTime = parseFloat(
    (averageReturnTime / sortedProcesses.length).toFixed(2),
  );

  return {
    gantt,
    averageResponseTime,
    averageReturnTime,
  };
};

export default roundRobin;
