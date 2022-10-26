import { useEffect, useRef, useState } from 'preact/hooks';
import ProcessesArray, { Process } from '../../types/process';
import SchedulingAlgorithm from '../../types/scheduling-algorithm';
import Dialog from '../dialog';
import ProcessInput from '../process-input';
import classes from './processes-display.module.scss';

interface Props {
  algorithm: SchedulingAlgorithm;
  onSubmit: (v: ProcessesArray) => void;
}

const ProcessDisplay = ({
  deleteItem,
  i,
  moveItem,
  p,
  processesLength,
}: {
  p: Process;
  moveItem: (d: 'up' | 'down', i: number) => void;
  deleteItem: (i: number) => void;
  processesLength: number;
  i: number;
}) => {
  const { name } = p;
  const elRef = useRef<HTMLDivElement | null>(null);
  let timeout: number | undefined;

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
      <p className={classes.name}>{name}</p>
      <div className={classes.processActions}>
        <button data-type="delete" onClick={() => deleteItem(i)} data-compact>
          <img loading="lazy" src="/icons/delete.svg" alt="Delete" />
        </button>
        <button
          onClick={() => {
            recentlyMoved();
            moveItem('up', i);
          }}
          data-compact
          disabled={i === 0}
        >
          <img loading="lazy" src="/icons/arrow_upward.svg" alt="Move up" />
        </button>
        <button
          onClick={() => {
            recentlyMoved();
            moveItem('down', i);
          }}
          data-compact
          disabled={i + 1 >= processesLength}
        >
          <img loading="lazy" src="/icons/arrow_downward.svg" alt="Move down" />
        </button>
      </div>
    </div>
  );
};

const ProcessesDisplay = ({ onSubmit, algorithm }: Props) => {
  const [processes, setProcesses] = useState<ProcessesArray>([]);
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
      <div className={classes.listDisplay}>
        {processes.map((p, i) => (
          <ProcessDisplay
            p={p}
            deleteItem={deleteItem}
            moveItem={moveItem}
            i={i}
            key={p.id}
            processesLength={processes.length}
          />
        ))}
        {processes.length === 0 ? (
          <p>No process added yet! click on the add button to add one</p>
        ) : null}
      </div>
      <div className={classes.actions}>
        <button onClick={() => setDialogState(true)}>Add</button>
        <button
          onClick={() => onSubmit(processes)}
          disabled={processes.length === 0}
          data-primary={true}
        >
          Submit
        </button>
      </div>
      <Dialog state={dialogSate} title="Add Process" setState={setDialogState}>
        <ProcessInput
          disablePriorityField={algorithm !== 'priority'}
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
