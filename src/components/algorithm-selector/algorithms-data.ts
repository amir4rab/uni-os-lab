import SchedulingAlgorithm from '../../types/scheduling-algorithm';

export interface Algorithm {
  name: string;
  id: SchedulingAlgorithm;
  shortInfo: string;
}

export const algorithms: Algorithm[] = [
  {
    id: 'sjf',
    name: 'Shortest Job First',
    shortInfo:
      'Shortest job first (SJF) or shortest process next (SPN), is a scheduling policy that selects for execution the waiting process with the smallest execution time. SJN is a non-preemptive algorithm. Shortest remaining time is a preemptive variant of SJN.',
  },
  {
    id: 'fcfs',
    name: 'First Come First Served',
    shortInfo:
      'First in, first out (FIFO), also known as first come, first served (FCFS), is the simplest scheduling algorithm. FIFO simply queues processes in the order that they arrive in the ready queue. This is commonly used for a task queue, for example as illustrated in this section.',
  },
  {
    id: 'round-robin',
    name: 'Round Robin',
    shortInfo:
      'The scheduler assigns a fixed time unit per process, and cycles through them. If process completes within that time-slice it gets terminated otherwise it is rescheduled after giving a chance to all other processes.',
  },
  {
    id: 'multi-level',
    name: 'Multi Level',
    shortInfo: '',
  },
  {
    id: 'lottery',
    name: 'Lottery',
    shortInfo: '',
  },
  {
    id: 'priority',
    name: 'Priority Scheduling',
    shortInfo:
      'Earliest deadline first (EDF) or least time to go is a dynamic scheduling algorithm used in real-time operating systems to place processes in a priority queue. Whenever a scheduling event occurs (a task finishes, new task is released, etc.), the queue will be searched for the process closest to its deadline, which will be the next to be scheduled for execution.',
  },
  {
    id: 'priority-preemptive',
    name: 'Priority preemptive Scheduling',
    shortInfo:
      'Earliest deadline first (EDF) or least time to go is a dynamic scheduling algorithm used in real-time operating systems to place processes in a priority queue. Whenever a scheduling event occurs (a task finishes, new task is released, etc.), the queue will be searched for the process closest to its deadline, which will be the next to be scheduled for execution.',
  },
];