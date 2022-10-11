import { useState } from 'preact/hooks';
import { Process } from '../../types/process';
import Dialog from '../dialog';
import ProcessInput from '../process-input';
import classes from './processes-display.module.scss';

const ProcessesDisplay = () => {
  const [processes, setProcesses] = useState<Process[]>([]);
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
        {processes.map(({ duration, id, insertionTime, name, priority }, i) => (
          <details className={classes.item} key={id}>
            <summary className={classes.summary}>
              <p>{name}</p>
              <p>More info</p>
            </summary>
            <div className={classes.content}>
              <div className={classes.row}>
                <p>Duration: {duration}ms</p>
                <p>Insertion Time: {insertionTime}ms</p>
                <p>Priority: {priority}</p>
              </div>
              <div className={classes.row}>
                <button onClick={() => deleteItem(i)} data-compact>
                  Remove
                </button>
                <button
                  onClick={() => moveItem('up', i)}
                  data-compact
                  disabled={i === 0}
                >
                  move up
                </button>
                <button
                  onClick={() => moveItem('down', i)}
                  data-compact
                  disabled={i + 1 >= processes.length}
                >
                  move down
                </button>
              </div>
            </div>
          </details>
        ))}
        {processes.length === 0 ? (
          <p>No process added yet! click on the add button to add one</p>
        ) : null}
      </div>
      <div className={classes.actions}>
        <button onClick={() => setDialogState(true)}>Add</button>
        <button disabled={processes.length === 0} data-primary={true}>
          Submit
        </button>
      </div>
      <Dialog state={dialogSate} title="Add Process" setState={setDialogState}>
        <ProcessInput
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
