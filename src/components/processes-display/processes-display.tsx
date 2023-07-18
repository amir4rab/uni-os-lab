import { useState } from 'preact/hooks';
import { Suspense, lazy } from 'preact/compat';

// types
import type { default as ProcessesArray } from '../../types/process';
import type SchedulingAlgorithm from '../../types/scheduling-algorithm';

// i18n
import { useTranslation } from '../../i18n';

// components
const Dialog = lazy(() => import('../dialog'));
const ProcessInput = lazy(() => import('../process-input'));
const ItemDisplay = lazy(() => import('./item-display'));

// classes
import classes from './processes-display.module.scss';

// utils
import {
  // isFeedBackQueue,
  // isMultiLevel,
  isPriority,
  isRoundRobin,
} from './utils';

interface Props {
  algorithms: SchedulingAlgorithm[];
  defaultProcesses?: ProcessesArray;
  onSubmit: (v: ProcessesArray, timeSlice: number) => void;
  defaultTimeSlice: number;
  goBack: () => void;
}

const ProcessesDisplay = ({
  onSubmit,
  algorithms,
  defaultProcesses = [],
  defaultTimeSlice = 1,
  goBack,
}: Props) => {
  const { t } = useTranslation('processes-display');
  const { t: commonT } = useTranslation('common');

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
      <h3 className={classes.title}>{t('addProcess')}</h3>
      {isRoundRobin(algorithms) && (
        <div className={classes.timeSliceInputGroup}>
          <label>{t('ts')}</label>
          <input
            type="number"
            defaultValue={timeSlice + ''}
            onChange={(v) =>
              v.target &&
              setTimeSlice(parseInt((v.target as HTMLInputElement).value))
            }
          />
        </div>
      )}
      <div className={classes.listDisplay}>
        {processes.map((p, i) => (
          <Suspense fallback={null}>
            <ItemDisplay
              algorithms={algorithms}
              p={p}
              deleteItem={deleteItem}
              moveItem={moveItem}
              i={i}
              key={p.id}
              processesLength={processes.length}
            />
          </Suspense>
        ))}
        {processes.length === 0 ? (
          <p className={classes.alert}>{t('noProcesses')}</p>
        ) : null}
      </div>
      <div className={classes.actions}>
        <button
          onClick={() => goBack()}
          className={['secondary', classes.backButton].join(' ')}
        >
          {commonT('goBack')}
        </button>
        <button className="secondary" onClick={() => setDialogState(true)}>
          {commonT('add')}
        </button>
        <button
          className={['primary', classes.submitButton].join(' ')}
          onClick={() => onSubmit(processes, timeSlice)}
          disabled={processes.length === 0}
        >
          {commonT('submit')}
        </button>
      </div>
      <Suspense fallback={null}>
        <Dialog
          state={dialogSate}
          title={t('addProcess')}
          setState={setDialogState}
        >
          <ProcessInput
            priorityEnabled={isPriority(algorithms)}
            typeEnabled={
              // isMultiLevel(algorithms)
              false
            }
            feedbackQueueEnabled={
              // isFeedBackQueue(algorithms)
              false
            }
            currentCount={processes.length + 1}
            submitProcess={(v) => {
              setProcesses((curr) => [...curr, v]);
              setDialogState(false);
            }}
          />
        </Dialog>
      </Suspense>
    </div>
  );
};

export default ProcessesDisplay;
