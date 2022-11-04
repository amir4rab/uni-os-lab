import { Process } from '../../types/process';
import { useRef, useState } from 'preact/hooks';
import classes from './process-input.module.scss';

interface Props {
  submitProcess: (v: Process) => void;
  currentCount: number;
  disablePriorityField?: boolean;
}

const ProcessInput = ({
  submitProcess,
  currentCount = 1,
  disablePriorityField = false,
}: Props) => {
  const [error, setError] = useState<null | string>(null);

  const nameInputRef = useRef<HTMLInputElement | null>(null);
  const priorityInputRef = useRef<HTMLInputElement | null>(null);
  const arrivalTimeInputRef = useRef<HTMLInputElement | null>(null);
  const durationInputRef = useRef<HTMLInputElement | null>(null);

  const resetInput = () => {
    if (
      nameInputRef.current === null ||
      priorityInputRef.current === null ||
      arrivalTimeInputRef.current === null ||
      durationInputRef.current === null
    ) {
      return;
    }

    nameInputRef.current.value = 'P' + (currentCount + 1);
    priorityInputRef.current.value = priorityInputRef.current.defaultValue;
    arrivalTimeInputRef.current.value =
      arrivalTimeInputRef.current.defaultValue;
    durationInputRef.current.value = durationInputRef.current.defaultValue;
  };

  const onSubmit = (e: JSX.TargetedEvent<HTMLFormElement, Event>) => {
    e.preventDefault();
    setError(null);

    if (
      nameInputRef.current === null ||
      priorityInputRef.current === null ||
      arrivalTimeInputRef.current === null ||
      durationInputRef.current === null
    ) {
      return;
    }

    if (
      typeof nameInputRef.current.value !== 'string' ||
      parseInt(priorityInputRef.current.value) === NaN ||
      parseInt(arrivalTimeInputRef.current.value) === NaN ||
      parseInt(durationInputRef.current.value) === NaN
    ) {
      const err =
        'Please check form data, other than name, every other field should be number!';
      setError(err);
      console.error(err);
      return;
    }

    const name = nameInputRef.current.value;
    const priority = parseInt(priorityInputRef.current.value);
    const arrivalTime = parseInt(arrivalTimeInputRef.current.value);
    const duration = parseInt(durationInputRef.current.value);

    submitProcess({
      duration,
      id: 'p' + (Math.random() * 10000).toFixed(0),
      arrivalTime,
      name,
      priority,
    });
    resetInput();
  };
  return (
    <form onSubmit={(e) => onSubmit(e)}>
      <div>
        <div className={classes.inputWrapper}>
          <label htmlFor="processName">Name</label>
          <input
            required
            type="text"
            id="processName"
            name="processName"
            defaultValue={'P1'}
            ref={nameInputRef}
          />
        </div>
        <div className={classes.inputWrapper}>
          <label htmlFor="priority">Priority</label>
          <input
            required
            type="number"
            id="priority"
            name="priority"
            disabled={disablePriorityField}
            min={0}
            max={127}
            defaultValue={'0'}
            ref={priorityInputRef}
          />
        </div>
        <div className={classes.inputWrapper}>
          <label htmlFor="arrivalTime">Arrival Time in ms</label>
          <input
            required
            min={0}
            type="number"
            id="arrivalTime"
            name="arrivalTime"
            defaultValue={'0'}
            ref={arrivalTimeInputRef}
          />
        </div>
        <div className={classes.inputWrapper}>
          <label htmlFor="duration">Duration in ms</label>
          <input
            required
            min={1}
            type="number"
            id="duration"
            name="duration"
            defaultValue={'1'}
            ref={durationInputRef}
          />
        </div>
      </div>
      <div className={classes.actions}>
        <button data-primary type="submit">
          Submit
        </button>
      </div>
    </form>
  );
};

export default ProcessInput;
