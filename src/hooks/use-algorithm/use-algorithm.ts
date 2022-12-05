// types
import ProcessArray from '../../types/process';
import ProcessResult from '../../types/process-results';
import SchedulingAlgorithm from '../../types/scheduling-algorithm';

// algorithms
import {
  fcfs,
  lottery,
  multiLevel,
  multiLevelFeedbackQueue,
  priority,
  priorityPreemptive,
  roundRobin,
  sjf,
} from './algorithms';

interface ProcessFNProps {
  algorithm: SchedulingAlgorithm;
  processes: ProcessArray;
  timeSlice?: number;
}

const defaultResult: ProcessResult = {
  averageResponseTime: 0,
  averageReturnTime: 0,
  gantt: [],
};

/**
 * A hook to processes, processes data
 */
const useAlgorithm = () => {
  /**
   * Processes an array of processes and return Gantt chart data and other related data
   */
  const process = ({ algorithm, processes, timeSlice = 1 }: ProcessFNProps) => {
    switch (algorithm) {
      case 'fcfs':
        return fcfs([...processes]);
      case 'sjf':
        return sjf([...processes]);
      case 'priority':
        return priority([...processes]);
      case 'priority-preemptive':
        return priorityPreemptive([...processes]);
      case 'round-robin':
        return roundRobin([...processes], timeSlice);
      case 'lottery':
        return lottery([...processes]);
      case 'multi-level':
        return multiLevel([...processes], timeSlice);
      case 'multi-level-feedback-queue':
        return multiLevelFeedbackQueue([...processes]);
      default:
        return defaultResult;
    }
  };

  return {
    process,
  };
};

export default useAlgorithm;
