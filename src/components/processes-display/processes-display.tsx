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
        {processes.map(({ id, name }, i) => (
          <div className={classes.item} key={id}>
            <p className={classes.name}>{name}</p>
            <div className={classes.processActions}>
              <button
                data-type="delete"
                onClick={() => deleteItem(i)}
                data-compact
              >
                <img loading="lazy" src="/icons/delete.svg" alt="Delete" />
              </button>
              <button
                onClick={() => moveItem('up', i)}
                data-compact
                disabled={i === 0}
              >
                <img
                  loading="lazy"
                  src="/icons/arrow_upward.svg"
                  alt="Move up"
                />
              </button>
              <button
                onClick={() => moveItem('down', i)}
                data-compact
                disabled={i + 1 >= processes.length}
              >
                <img
                  loading="lazy"
                  src="/icons/arrow_downward.svg"
                  alt="Move down"
                />
              </button>
            </div>
          </div>
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
