import { useEffect, useRef, useState } from 'preact/hooks';
import ProcessesArray, { Process } from '../../types/process';
import SchedulingAlgorithm from '../../types/scheduling-algorithm';
import Dialog from '../dialog';
import { DeleteIcon, DownArrowIcon, UpArrowIcon } from '../icons';
import ProcessInput from '../process-input';
import classes from './processes-display.module.scss';

const isPriority = (algorithms: SchedulingAlgorithm[]) => 
  algorithms.includes('priority') ||
  algorithms.includes('priority-preemptive');

const isFeedBackQueue = (algorithms: SchedulingAlgorithm[]) =>
  algorithms.includes('multi-level-feedback-queue');

const isRoundRobin = (algorithms: SchedulingAlgorithm[]) =>
  algorithms.includes('round-robin') || algorithms.includes('multi-level');

const isMultiLevel = (algorithms: SchedulingAlgorithm[]) => 
  algorithms.includes('multi-level');

interface Props {
  algorithms: SchedulingAlgorithm[];
  defaultProcesses?: ProcessesArray;
  onSubmit: (v: ProcessesArray, timeSlice: number) => void;
  defaultTimeSlice: number;
  goBack: () => void;
}

const ProcessDisplay = ({
  deleteItem,
  i,
  moveItem,
  p,
  processesLength,
  algorithms,
}: {
  p: Process;
  moveItem: (d: 'up' | 'down', i: number) => void;
  deleteItem: (i: number) => void;
  processesLength: number;
  i: number;
  algorithms: SchedulingAlgorithm[];
}) => {
  const { name, arrivalTime, duration, id, priority, type, cpuBursts, ioBursts } = p;
  const elRef = useRef<HTMLDivElement | null>(null);
  const [expanded, setExpanded] = useState(false);
  let timeout: number | undefined | NodeJS.Timeout;

  useEffect(() => {
    // clearing timeout upon element removal
    return () => timeout && clearTimeout(timeout);
  }, []);

  const recentlyMoved = () => {
    // verifying element existence and then selecting it
    if (elRef.current === null) return;
    const div = elRef.current;

    // setting attribute
    div.setAttribute('data-recently-moved', 'true');

    // clearing previous timeout if existed
    timeout && clearTimeout(timeout);

    // setting a new timeout
    timeout = setTimeout(() => div.removeAttribute('data-recently-moved'), 300);
  };

  return (
    <div ref={elRef} className={classes.item}>
      <div className={classes.mainInfo}>
        <p className={classes.name}>{name}</p>
        <button onClick={() => setExpanded((curr) => !curr)}>i</button>
      </div>
      <div className={classes.processActions}>
        <button  
          data-type="delete" 
          onClick={() => deleteItem(i)} 
          data-compact
        >
          <DeleteIcon />
        </button>
        <button
          onClick={() => {
            recentlyMoved();
            moveItem('up', i);
          }}
          data-compact
          disabled={i === 0}
        >
          <UpArrowIcon />
        </button>
        <button
          onClick={() => {
            recentlyMoved();
            moveItem('down', i);
          }}
          data-compact
          disabled={i + 1 >= processesLength}
        >
          <DownArrowIcon />
        </button>
      </div>
      <div className={classes.subInfo} data-shown={expanded ? true : undefined}>
        <p className={classes.subInfoGroup}>
          <span className={classes.subInfoName}>Arrival time: </span>
          <span>{`${arrivalTime}ms`}</span>
        </p>
        <p className={classes.subInfoGroup}>
          <span className={classes.subInfoName}>{`Duration: `}</span>
          <span>{`${duration}ms`}</span>
        </p>
        <p className={classes.subInfoGroup}>
          <span className={classes.subInfoName}>{`ID: `}</span>
          <span>{id}</span>
        </p>
        {
          isPriority(algorithms) && (
            <p className={classes.subInfoGroup}>
              <span className={classes.subInfoName}>{`Priority: `}</span>{' '}
              <span>{priority}</span>
            </p>
          )
        }
        { isMultiLevel(algorithms) && (
          <p className={classes.subInfoGroup}>
            <span className={classes.subInfoName}>{`Type: `}</span>{' '}
            <span>{type}</span>
          </p>
        )}
        { isFeedBackQueue(algorithms) && (
          <>
            <p className={classes.subInfoGroup}>
              <span className={classes.subInfoName}>{`IO Bursts: `}</span>{' '}
              <span>{ioBursts}</span>
            </p>
            <p className={classes.subInfoGroup}>
              <span className={classes.subInfoName}>{`Cpu Bursts: `}</span>{' '}
              <span>{cpuBursts}</span>
            </p>
          </>
        )}
      </div>
    </div>
  );
};

const ProcessesDisplay = ({
  onSubmit,
  algorithms,
  defaultProcesses = [],
  defaultTimeSlice = 1,
  goBack,
}: Props) => {
  const [processes, setProcesses] = useState<ProcessesArray>(defaultProcesses);
  const [timeSlice, setTimeSlice] = useState(defaultTimeSlice);
  const [dialogSate, setDialogState] = useState(false);

  const moveItem = (action: 'down' | 'up', i: number) => {
    setProcesses((processes) => {
      const copiedProcesses = [...processes];
      const item = copiedProcesses[i];
      copiedProcesses[i] = copiedProcesses[action === 'down' ? i + 1 : i - 1];
      copiedProcesses[action === 'down' ? i + 1 : i - 1] = item;
      return copiedProcesses;
    });
  };

  const deleteItem = (i: number) =>
    setProcesses((curr) => curr.filter((_, index) => i !== index));

  return (
    <div>
      <h3 className={classes.title}>Add Processes</h3>
      { 
        isRoundRobin(algorithms) && (
          <div className={classes.timeSliceInputGroup}>
            <label>Time Slice</label>
            <input
              type="number"
              defaultValue={timeSlice + ''}
              onChange={(v) =>
                v.target &&
                setTimeSlice(parseInt((v.target as HTMLInputElement).value))
              }
            />
          </div>
        )
      }
      <div className={classes.listDisplay}>
        {processes.map((p, i) => (
          <ProcessDisplay
            algorithms={algorithms}
            p={p}
            deleteItem={deleteItem}
            moveItem={moveItem}
            i={i}
            key={p.id}
            processesLength={processes.length}
          />
        ))}
        {processes.length === 0 ? (
          <p className={classes.alert}>
            No process added yet! click on the add button to add one
          </p>
        ) : null}
      </div>
      <div className={classes.actions}>
        <button
          onClick={() => goBack()}
          className="secondary"
          style="margin-right:auto;"
        >
          Go back
        </button>
        <button className="secondary" onClick={() => setDialogState(true)}>
          Add
        </button>
        <button
          style="margin-left: .5rem;"
          className="primary"
          onClick={() => onSubmit(processes, timeSlice)}
          disabled={processes.length === 0}
        >
          Submit
        </button>
      </div>
      <Dialog state={dialogSate} title="Add Process" setState={setDialogState}>
        <ProcessInput
          priorityEnabled={isPriority(algorithms)}
          typeEnabled={isMultiLevel(algorithms)}
          feedbackQueueEnabled={isFeedBackQueue(algorithms)}
          currentCount={processes.length + 1}
          submitProcess={(v) => {
            setProcesses((curr) => [...curr, v]);
            setDialogState(false);
          }}
        />
      </Dialog>
    </div>
  );
};

export default ProcessesDisplay;
