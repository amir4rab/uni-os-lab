type SchedulingAlgorithm =
  | 'fcfs'
  | 'sjf'
  | 'round-robin'
  | 'priority'
  | 'lottery'
  | 'multi-level'
  | 'multi-level-feedback-queue'
  | 'priority-preemptive';

export default SchedulingAlgorithm;
