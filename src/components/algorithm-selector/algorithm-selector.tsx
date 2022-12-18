import { useCallback, useMemo, useState } from 'preact/hooks';
import { lazy, Suspense } from 'preact/compat';
import { useTranslation } from '../../i18n';

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
  defaultSelectedAlgorithms: SchedulingAlgorithm[];
}

const validateDefaultAlgorithms = (
  defaultSelectedAlgorithms: SchedulingAlgorithm[],
): (SchedulingAlgorithm | null)[] => {
  if (defaultSelectedAlgorithms.length === 0)
    return new Array(algorithms.length).fill(null, 0, algorithms.length);

  return algorithms.map(({ id }) =>
    defaultSelectedAlgorithms.includes(id) ? id : null,
  );
};

const AlgorithmSelector = ({ onSubmit, defaultSelectedAlgorithms }: Props) => {
  const [selectedAlgorithms, setSelectedAlgorithms] = useState<
    (SchedulingAlgorithm | null)[]
  >(validateDefaultAlgorithms(defaultSelectedAlgorithms));
  const [customMode, setCustomMode] = useState<boolean>(false);
  const { t } = useTranslation('algorithm-selector');

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
        <h3 className={classes.title}>{t('initial-prompt')}</h3>
        <div className={classes.content}>
          <div className={classes.algorithm}>
            <div className={classes.header}>
              <h4 className={classes.title}>{t('expert-mode')}</h4>
              <button
                className={[classes.desktopButton, 'primary'].join(' ')}
                onClick={submitAll}
                data-primary
              >
                {t('export-mode-btn')}
              </button>
            </div>
            <p className={classes.about}>
              {t('expert-mode-description')}
            </p>
          </div>
          <div className={classes.algorithm}>
            <div className={classes.header}>
              <h4 className={classes.title}>{t('custom-mode')}</h4>
              {!selectedAlgorithmExist && (
                <button
                  className={classes.desktopButton}
                  onClick={() => setCustomMode(true)}
                >
                  {t('select-algorithms')}
                </button>
              )}
            </div>
            <p className={classes.about}>
              {t('custom-mode-description')}
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
                  title: t('expert-mode'),
                  submit: submitAll,
                  customMode: () => setCustomMode(true),
                }
              : { title: t('custom-mode-btn'), submit: submitSelected })}
          />
        </div>
      </div>
      <Suspense fallback={null}>
        <DialogExpanded
          title={t('custom-mode')}
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
