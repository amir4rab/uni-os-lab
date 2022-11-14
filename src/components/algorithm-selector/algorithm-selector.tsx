import { useState } from 'preact/hooks';
import SchedulingAlgorithm from '../../types/scheduling-algorithm';
import classes from './algorithm-selector.module.scss';
import Checkbox from '../checkbox';

interface Algorithm {
  name: string;
  id: SchedulingAlgorithm;
  shortInfo: string;
}

const algorithms: Algorithm[] = [
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
];

interface Props {
  onSubmit: (v: SchedulingAlgorithm[]) => void;
}

const AlgorithmSelector = ({ onSubmit }: Props) => {
  const [selectedAlgorithms, setSelectedAlgorithms] = useState<
    (SchedulingAlgorithm | null)[]
  >(new Array(algorithms.length).fill(null, 0, algorithms.length));
  const [expandedIndex, setExpandedIndex] = useState(-1);
  const [customMode, setCustomMode] = useState(false);

  const toggleAlgorithm = (
    algorithm: SchedulingAlgorithm,
    toggleV: boolean,
    index: number,
  ) => {
    setSelectedAlgorithms((curr) => {
      const nArray = [...curr];
      nArray[index] = toggleV ? algorithm : null;
      return nArray;
    });
  };

  return (
    <div>
      <h3 className={classes.title}>Please select a Scheduling Algorithm</h3>
      <div className={classes.contentWrapper}>
        <div 
          data-displayed={!customMode} 
          className={classes.algorithmWrapper}
        >
          <div className={classes.header}>
            <h4 className={classes.title}>Expert mode</h4>
          </div>
          <p className={classes.about}>
            Processes your data with every possible algorithm
          </p>
          <div className={classes.submitWrapper}>
            <button
              onClick={() => onSubmit(algorithms.map(({ id }) => id))}
              className="primary"
            >
              Select
            </button>
          </div>
          <div className={classes.divider}/>
          <p className={classes.about}>Or mix and match your favoraite algorithms with custom mode</p>
          <div className={classes.submitWrapper}>
            <button
              onClick={() => setCustomMode(true)}
              className="secondary"
            >
              Custom Mode
            </button>
          </div>
        </div>
        <div
          data-displayed={customMode}
          className={classes.algorithmWrapper}
        >
          <div className={classes.header}>
            <button onClick={() => setCustomMode(false)} className={classes.backButton}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                <title>Chevron Back</title>
                <path 
                  fill="none"
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth="48" 
                  d="M328 112L184 256l144 144"
                />
              </svg>
            </button>
            <h4 className={classes.title}>Custom mode</h4>
          </div>
          {algorithms.map(({ id, name, shortInfo }, i) => (
            <div
              key={id}
              data-expanded={i === expandedIndex ? true : undefined}
              className={classes.item}
            >
              <div className={classes.header}>
                <Checkbox
                  id={id + '-checkbox'}
                  onChange={(v) => {
                    toggleAlgorithm(id, v, i);
                  }}
                  outerState={selectedAlgorithms[i] !== null}
                />
                <h4
                  onClick={() => {
                    toggleAlgorithm(id, selectedAlgorithms[i] === null, i);
                  }}
                  className={classes.title}
                  style="margin-left: .5rem;"
                  data-clickable
                >
                  {name}
                </h4>
                <button
                  onClick={() =>
                    setExpandedIndex((curr) => (curr !== i ? i : -1))
                  }
                >
                  {expandedIndex === i ? 'Show less' : 'More info'}
                </button>
              </div>
              <p className={classes.about}>{shortInfo}</p>
            </div>
          ))}
          <div className={classes.algorithmsFooter}>
            <button
              disabled={
                selectedAlgorithms.filter((i) => i !== null).length === 0
              }
              className="secondary"
              onClick={() =>
                selectedAlgorithms.length !== 0 &&
                onSubmit(
                  selectedAlgorithms.filter(
                    (i) => i !== null,
                  ) as SchedulingAlgorithm[],
                )
              }
            >
              Continue with selected
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlgorithmSelector;
