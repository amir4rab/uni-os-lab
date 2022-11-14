import { Process } from '../../types/process';
import { useRef, useState } from 'preact/hooks';
import classes from './process-input.module.scss';

interface Props {
  submitProcess: (v: Process) => void;
  currentCount: number;
  priorityEnabled?: boolean;
  typeEnabled?: boolean;
}

const ProcessInput = ({
  submitProcess,
  currentCount = 1,
  priorityEnabled = false,
  typeEnabled = false,
}: Props) => {
  const [error, setError] = useState<null | string>(null);

  const nameInputRef = useRef<HTMLInputElement | null>(null);
  const priorityInputRef = useRef<HTMLInputElement | null>(null);
  const arrivalTimeInputRef = useRef<HTMLInputElement | null>(null);
  const durationInputRef = useRef<HTMLInputElement | null>(null);
  const processTypeSelectRef = useRef<HTMLSelectElement | null>(null);

  const resetInput = () => {
    if (nameInputRef.current !== null)
      nameInputRef.current.value = 'P' + (currentCount + 1);

    if (priorityInputRef.current !== null)
      priorityInputRef.current.value = priorityInputRef.current.defaultValue;

    if (arrivalTimeInputRef.current !== null)
      arrivalTimeInputRef.current.value =
        arrivalTimeInputRef.current.defaultValue;

    if (durationInputRef.current !== null)
      durationInputRef.current.value = durationInputRef.current.defaultValue;

    if (processTypeSelectRef.current !== null)
      processTypeSelectRef.current.value = 'foreground';
  };

  const onSubmit = (e: JSX.TargetedEvent<HTMLFormElement, Event>) => {
    e.preventDefault();
    setError(null);

    if (
      nameInputRef.current === null ||
      arrivalTimeInputRef.current === null ||
      durationInputRef.current === null
    ) {
      return;
    }

    if (
      typeof nameInputRef.current.value !== 'string' ||
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
    const type =
      processTypeSelectRef.current === null
        ? 'foreground'
        : (processTypeSelectRef.current.value as 'foreground' | 'background');
    const priority =
      priorityInputRef.current === null
        ? 0
        : parseInt(priorityInputRef.current.value);
    const arrivalTime = parseInt(arrivalTimeInputRef.current.value);
    const duration = parseInt(durationInputRef.current.value);

    submitProcess({
      duration,
      id: 'p' + (Math.random() * 10000).toFixed(0),
      arrivalTime,
      name,
      priority,
      type,
    });
    resetInput();
  };

  const submitRandomData = () => {
    const name = nameInputRef.current ? nameInputRef.current.value : 'p';

    submitProcess({
      duration: parseInt((Math.random() * 30).toFixed(0)),
      id: 'p' + (Math.random() * 10000).toFixed(0),
      arrivalTime: parseInt((Math.random() * 30).toFixed(0)),
      name,
      priority: parseInt((Math.random() * 127).toFixed(0)),
      type: (Math.random() * 10) > 5 ? 'background' : 'foreground',
    });
    resetInput();
  }

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
        {priorityEnabled && (
          <div className={classes.inputWrapper}>
            <label htmlFor="priority">Priority</label>
            <input
              required
              type="number"
              id="priority"
              name="priority"
              min={0}
              max={127}
              defaultValue={'0'}
              ref={priorityInputRef}
            />
          </div>
        )}
        {typeEnabled && (
          <div className={classes.inputWrapper}>
            <label htmlFor="processType">Process type</label>
            <select
              required
              id="processType"
              name="processType"
              defaultValue={'foreground'}
              ref={processTypeSelectRef}
            >
              <option value="foreground">Foreground</option>
              <option value="background">Background</option>
            </select>
          </div>
        )}
        <div className={classes.inputWrapper}>
          <label htmlFor="arrivalTime">Arrival time in ms</label>
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
          <label htmlFor="duration">Execution time in ms</label>
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
        <button className='secondary' style='margin-right: .5rem' type="button" onClick={submitRandomData}>
          Use Random data
        </button>
        <button className='primary' type="submit">
          Submit
        </button>
      </div>
    </form>
  );
};

export default ProcessInput;
