import { useCallback, useMemo, useState } from 'preact/hooks';
import { lazy, Suspense } from 'preact/compat';

// styles
import classes from './algorithm-selector.module.scss';

// types
import SchedulingAlgorithm from '../../types/scheduling-algorithm';

// data
import { algorithms } from './algorithms-data';

// components
import AlgorithmSelectorDialogInner from './dialog-inner';
import AlgorithmSelectorSubmitButtons from './submit-buttons';
import AlgorithmSelectorSelectedAlgorithms from './selected-algorithms';

// lazy components
const DialogExpanded = lazy(() => import('../dialog-expanded'));

interface Props {
  onSubmit: (v: SchedulingAlgorithm[]) => void;
}

const AlgorithmSelector = ({ onSubmit }: Props) => {
  const [selectedAlgorithms, setSelectedAlgorithms] = useState<
    (SchedulingAlgorithm | null)[]
  >(new Array(algorithms.length).fill(null, 0, algorithms.length));
  const [customMode, setCustomMode] = useState<boolean>(false);

  const toggle = (
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

  const clearAll = () =>
    setSelectedAlgorithms(
      new Array(algorithms.length).fill(null, 0, algorithms.length),
    );

  const submitAll = () => onSubmit(algorithms.map(({ id }) => id));

  const submitSelected = useCallback(
    () =>
      onSubmit(
        selectedAlgorithms.filter((i) => i !== null) as SchedulingAlgorithm[],
      ),
    [selectedAlgorithms],
  );

  const selectedAlgorithmExist = useMemo(
    () => selectedAlgorithms.filter((i) => i !== null).length !== 0,
    [selectedAlgorithms],
  );

  return (
    <>
      <div>
        <h3 className={classes.title}>Please select a Scheduling Algorithm</h3>
        <div className={classes.content}>
          <div className={classes.algorithm}>
            <div className={classes.header}>
              <h4 className={classes.title}>Expert mode</h4>
              <button
                className={[classes.desktopButton, 'primary'].join(' ')}
                onClick={submitAll}
                data-primary
              >
                Continue with Expert mode
              </button>
            </div>
            <p className={classes.about}>
              Processes your data with every possible algorithm
            </p>
          </div>
          <div className={classes.algorithm}>
            <div className={classes.header}>
              <h4 className={classes.title}>Custom mode</h4>
              <button
                className={classes.desktopButton}
                onClick={() => setCustomMode(true)}
              >
                {selectedAlgorithmExist
                  ? `Modify selected algorithms`
                  : `Select algorithms`}
              </button>
            </div>
            <p className={classes.about}>
              Mix and match algorithms to your liking
            </p>
            <AlgorithmSelectorSelectedAlgorithms
              displayed={selectedAlgorithmExist}
              selectedAlgorithms={selectedAlgorithms}
              onSubmitSelected={submitSelected}
              onToggle={toggle}
              onClearAll={clearAll}
              onEdit={() => setCustomMode(true)}
            />
          </div>
          <AlgorithmSelectorSubmitButtons
            {...(!selectedAlgorithmExist
              ? {
                  title: 'Expert',
                  submit: submitAll,
                  customMode: () => setCustomMode(true),
                }
              : { title: 'Continue with selected', submit: submitSelected })}
          />
        </div>
      </div>
      <Suspense fallback={null}>
        <DialogExpanded
          title="Custom Mode"
          setState={setCustomMode}
          state={customMode}
        >
          <AlgorithmSelectorDialogInner
            toggle={toggle}
            selectedAlgorithms={selectedAlgorithms}
          />
        </DialogExpanded>
      </Suspense>
    </>
  );
};

export default AlgorithmSelector;
