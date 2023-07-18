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
  // {
  //   id: 'multi-level',
  //   name: 'Multi Level',
  //   shortInfo:
  //     'Multi-level queueing, used at least since the late 1950s/early 1960s, is a queue with a predefined number of levels. Items get assigned to a particular level at insert (using some predefined algorithm), and thus cannot be moved to another level (unlike in the multilevel feedback queue). Items get removed from the queue by removing all items from a level, and then moving to the next. If an item is added to a level above, the "fetching" restarts from there. Each level of the queue is free to use its own scheduling, thus adding greater flexibility than merely having multiple levels in a queue.',
  // },
  // {
  //   id: 'multi-level-feedback-queue',
  //   name: 'Multi Level Feedback Queue',
  //   shortInfo: `
  //     Scheduling algorithms are designed to have some process running at all times to keep the central processing unit (CPU) busy. The multilevel feedback queue extends standard algorithms with the following design requirements: A) Separate processes into multiple ready queues based on their need for the processor. B) Give preference to processes with short CPU bursts.
  //   `,
  // },
  {
    id: 'lottery',
    name: 'Lottery',
    shortInfo: `
      Lottery scheduling is a probabilistic scheduling algorithm for processes in an operating system. Processes are each assigned some number of lottery tickets, and the scheduler draws a random ticket to select the next process. The distribution of tickets need not be uniform; granting a process more tickets provides it a relative higher chance of selection. This technique can be used to approximate other scheduling algorithms, such as Shortest job next and Fair-share scheduling. Lottery scheduling solves the problem of starvation. Giving each process at least one lottery ticket guarantees that it has non-zero probability of being selected at each scheduling operation.
    `,
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
