import { useState } from 'preact/hooks';
import SchedulingAlgorithm from '../../types/scheduling-algorithm';
import classes from './algorithm-selector.module.scss';

interface Algorithm {
  name: string;
  id: SchedulingAlgorithm;
  shortInfo: string;
  implemented: boolean;
}

const algorithms: Algorithm[] = [
  {
    id: 'sjf',
    name: 'Shortest Job First',
    shortInfo:
      'Shortest job first (SJF) or shortest process next (SPN), is a scheduling policy that selects for execution the waiting process with the smallest execution time. SJN is a non-preemptive algorithm. Shortest remaining time is a preemptive variant of SJN.',
    implemented: true,
  },
  {
    id: 'fcfs',
    name: 'First Come First Served',
    shortInfo:
      'First in, first out (FIFO), also known as first come, first served (FCFS), is the simplest scheduling algorithm. FIFO simply queues processes in the order that they arrive in the ready queue. This is commonly used for a task queue, for example as illustrated in this section.',
    implemented: true,
  },
  {
    id: 'round-robin',
    name: 'Round Robin',
    shortInfo:
      'The scheduler assigns a fixed time unit per process, and cycles through them. If process completes within that time-slice it gets terminated otherwise it is rescheduled after giving a chance to all other processes.',
    implemented: true,
  },
  {
    id: 'priority',
    name: 'Priority Scheduling',
    shortInfo:
      'Earliest deadline first (EDF) or least time to go is a dynamic scheduling algorithm used in real-time operating systems to place processes in a priority queue. Whenever a scheduling event occurs (a task finishes, new task is released, etc.), the queue will be searched for the process closest to its deadline, which will be the next to be scheduled for execution.',
    implemented: true,
  },
];

interface Props {
  onSubmit: (v: SchedulingAlgorithm) => void;
}

const AlgorithmSelector = ({ onSubmit }: Props) => {
  const [expandedIndex, setExpandedIndex] = useState(-1);

  return (
    <div>
      <h3 className={classes.title}>Please select a Scheduling Algorithm</h3>
      <div>
        <div className={classes.algorithmWrapper}>
          <div data-expanded={true} className={classes.item}>
            <div className={classes.header}>
              <h4 className={classes.title}>Expert mode</h4>
            </div>
            <p className={classes.about}>
              Processes your data with every possible algorithm
            </p>
            <div className={classes.submitWrapper}>
              <button onClick={() => onSubmit('all')} className="primary">
                Select
              </button>
            </div>
          </div>
        </div>
        <div className={classes.algorithmWrapper}>
          {algorithms.map(({ id, name, shortInfo, implemented }, i) => (
            <div
              key={id}
              data-expanded={i === expandedIndex ? true : undefined}
              className={classes.item}
            >
              <div className={classes.header}>
                <h4 className={classes.title}>{name}</h4>
                <button
                  onClick={() =>
                    setExpandedIndex((curr) => (curr !== i ? i : -1))
                  }
                >
                  {expandedIndex === i ? 'Show less' : 'More info'}
                </button>
              </div>
              <p className={classes.about}>{shortInfo}</p>
              <div className={classes.submitWrapper}>
                <button
                  disabled={!implemented}
                  onClick={() => onSubmit(id)}
                  className="secondary"
                >
                  {implemented ? 'Select' : 'Coming Soon'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AlgorithmSelector;
