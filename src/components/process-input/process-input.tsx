import { MutableRef, useRef, useState } from 'preact/hooks';

// classes
import classes from './process-input.module.scss';

// types
import { Process } from '../../types/process';
import { ComponentChildren } from 'preact';

// components
import Input from '../input';
import Select from '../select';
import { useTranslation } from '../../i18n';

const ConditionallyDisplayed = ({
  children,
  displayed,
  title,
}: {
  children: ComponentChildren;
  displayed: boolean;
  title?: string;
}) => (
  <>
    {!displayed ? null : (
      <>
        {title && (
          <div className={classes.divider}>
            <div className={classes.br} />
            <p>{title}</p>
            <div className={classes.br} />
          </div>
        )}
        {children}
      </>
    )}
  </>
);

interface Props {
  submitProcess: (v: Process) => void;
  currentCount: number;
  priorityEnabled?: boolean;
  typeEnabled?: boolean;
  feedbackQueueEnabled?: boolean;
}

const ProcessInput = ({
  submitProcess,
  currentCount = 1,
  priorityEnabled = false,
  typeEnabled = false,
  feedbackQueueEnabled = false,
}: Props) => {
  const {t} = useTranslation('process-input');

  const [error, setError] = useState<null | string>(null);

  const nameInputRef = useRef<HTMLInputElement | null>(null);
  const priorityInputRef = useRef<HTMLInputElement | null>(null);
  const arrivalTimeInputRef = useRef<HTMLInputElement | null>(null);
  const durationInputRef = useRef<HTMLInputElement | null>(null);
  const processTypeSelectRef = useRef<HTMLSelectElement | null>(null);
  const processIoBurstsSelectRef = useRef<HTMLSelectElement | null>(null);
  const processCpuBurstsSelectRef = useRef<HTMLSelectElement | null>(null);

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
      processTypeSelectRef.current.selectedIndex = 0;

    if (processIoBurstsSelectRef.current !== null)
      processIoBurstsSelectRef.current.value = 'high';

    if (processCpuBurstsSelectRef.current !== null)
      processCpuBurstsSelectRef.current.value = 'short';
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
      isNaN(parseInt(arrivalTimeInputRef.current.value)) ||
      isNaN(parseInt(durationInputRef.current.value))
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
    const cpuBursts =
      processCpuBurstsSelectRef.current === null
        ? 'short'
        : (processCpuBurstsSelectRef.current.value as 'short' | 'long');
    const ioBursts =
      processIoBurstsSelectRef.current === null
        ? 'high'
        : (processIoBurstsSelectRef.current.value as 'high' | 'low');
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
      cpuBursts,
      ioBursts,
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
      type: Math.random() * 10 > 5 ? 'background' : 'foreground',
      cpuBursts: 'long',
      ioBursts: 'high',
    });
    resetInput();
  };

  return (
    <form onSubmit={(e) => onSubmit(e)}>
      <div>
        <Input
          required={true}
          type='text'
          id='processName'
          name={t('processName')}
          defaultValue={'P1'}
          passedRef={nameInputRef}
        />
        <Input
          name={t('at')}
          required={true}
          min={0}
          type='number'
          id='arrivalTime'
          defaultValue={'0'}
          passedRef={arrivalTimeInputRef}
        />
        <Input
          name={t('et')}
          required={true}
          min={1}
          type='number'
          id='duration'
          defaultValue={'1'}
          passedRef={durationInputRef}
        />
        <ConditionallyDisplayed
          displayed={priorityEnabled}
          title={t('pao')}
        >
          <Input
            name={t('priority')}
            required={true}
            type='number'
            id='priority'
            min={0}
            max={127}
            defaultValue={'0'}
            passedRef={priorityInputRef}
          />
        </ConditionallyDisplayed>
        <ConditionallyDisplayed
          displayed={typeEnabled}
          title={t('mlo')}
        >
          <Select
            required={true}
            id='processType'
            name={t('pt')}
            defaultValue={'foreground'}
            passedRef={processTypeSelectRef}
            options={[
              { value: 'foreground', name: t('foreground') },
              { value: 'background', name: t('background') },
            ]}
          />
        </ConditionallyDisplayed>
        <ConditionallyDisplayed
          displayed={feedbackQueueEnabled}
          title={t('fqao')}
        >
          <Select
            required={true}
            id='cpuBurtType'
            name={t('cb')}
            defaultValue={'short'}
            passedRef={processCpuBurstsSelectRef}
            options={[
              { value: 'short', name: t('short') },
              { value: 'long', name: t('long') },
            ]}
          />
          <Select
            required={true}
            id='ioBurtType'
            name={t("ib")}
            defaultValue={'high'}
            passedRef={processIoBurstsSelectRef}
            options={[
              { value: 'high', name: t('high') },
              { value: 'low', name: t('low') },
            ]}
          />
        </ConditionallyDisplayed>
      </div>
      <div className={classes.actions}>
        <button
          className={['secondary', classes.random].join(' ')}
          type='button'
          data-compact
          onClick={submitRandomData}
        >
          {t('random')}
        </button>
        <button
          data-compact
          className={['primary', classes.submit].join(' ')}
          type='submit'
        >
          {t('submit')}
        </button>
      </div>
    </form>
  );
};

export default ProcessInput;
