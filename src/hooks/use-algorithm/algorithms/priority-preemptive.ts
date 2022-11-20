import Gantt from '../../../types/gannt';
import ProcessArray from '../../../types/process';
import ProcessResult from '../../../types/process-results';
import { 
  findNextPrioritizedItemPreemptive as findNextPrioritizedItem
} from '../helpers/priority';

const priorityPreemptive = (processes: ProcessArray): ProcessResult => {
  // Results variables
  const gantt: Gantt = [];
  let averageReturnTime = 0;
  let averageResponseTime = 0;

  // Processing variables
  let reminders: number[] = [];
  let arrivalTimes: number[] = [];
  let totalExecutionTimes = 0;
  let totalArrivalTimes = 0;
  let currentTime = 0;

  for ( let i = 0; i < processes.length; i++ ) {
    const { arrivalTime, duration } = processes[i];

    reminders.push(duration);
    totalExecutionTimes += duration;
    
    arrivalTimes.push(arrivalTime);
    totalArrivalTimes += arrivalTime;
  }



  const timeSliceUntilNextArrival = (index: number, currentTime: number) => {
    for (let i = index + 1; i < arrivalTimes.length; i++ ) {
      if ( currentTime < arrivalTimes[i] ) {
        return arrivalTimes[i] - currentTime;
      }
    }

    return -1;
  }

  while ( true ) { 
    let selectedItem = findNextPrioritizedItem(processes, reminders, currentTime);

    if (selectedItem === -1) {
      break;
    }

    const { id, name, arrivalTime } = processes[selectedItem];
    const timeSlice = timeSliceUntilNextArrival(selectedItem, currentTime);

    currentTime = currentTime > arrivalTime ? currentTime : arrivalTime;
    const executedChunk = 
      timeSlice === -1 || timeSlice > reminders[selectedItem] ? 
        reminders[selectedItem]: // Incases there is no other arrival time or time slice is longer than process execution time 
        timeSlice; // Incase there another arrival time and time slice is shorter than process execution time

    gantt.push({
      startTime: currentTime,
      endTime: currentTime + executedChunk,
      id: id + (Math.random() * 10).toFixed(0),
      ogId: id,
      processName: name,
    });

    reminders[selectedItem] = reminders[selectedItem] - executedChunk;

    if ( reminders[selectedItem] === 0 ) averageResponseTime += currentTime + executedChunk;
    currentTime += executedChunk;
  }

  // Shortcut to calculate average response time in preemptive algorithms
  averageReturnTime = averageResponseTime - totalExecutionTimes - totalArrivalTimes;

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

export default priorityPreemptive;