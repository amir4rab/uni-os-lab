import { Suspense, lazy } from 'preact/compat';

// types
import type SchedulingAlgorithm from '../../types/scheduling-algorithm';

// styling
import classes from './selected-algorithms.module.scss';

// data
import { algorithms } from './algorithms-data';

// lazy components
const DeleteIcon = lazy(() => import('../icons/components/delete'));
const CloseIcon = lazy(() => import('../icons/components/x-circle'));
const PenIcon = lazy(() => import('../icons/components/pen'));

interface Props {
  selectedAlgorithms: (SchedulingAlgorithm | null)[];
  displayed: boolean;
  onToggle: (
    algorithm: SchedulingAlgorithm,
    onToggleV: boolean,
    index: number,
  ) => void;
  onClearAll: () => void;
  onSubmitSelected: () => void;
  onEdit: () => void;
}

const AlgorithmSelectorSelectedAlgorithms = ({
  displayed,
  selectedAlgorithms,
  onToggle,
  onClearAll,
  onSubmitSelected,
  onEdit,
}: Props) => (
  <div
    data-displayed={displayed}
    className={classes.algorithmSelectorSelectedAlgorithms}
  >
    <div className={classes.header}>
      <p>Selected algorithms</p>
      <Suspense fallback={null}>
        <div className={classes.headerActions}>
          <button onClick={onClearAll}>
            <DeleteIcon />
          </button>
          <button onClick={onEdit}>
            <PenIcon />
          </button>
        </div>
      </Suspense>
    </div>
    <div>
      {algorithms.map(({ name, id }, i) => {
        if (selectedAlgorithms[i] === null) return null;

        return (
          <div className={['dialog-item', classes.item].join(' ')} key={id}>
            <div className="item-header">
              <p className="item-title">{name}</p>
              <button onClick={() => onToggle(id, false, i)}>
                <Suspense fallback={null}>
                  <CloseIcon />
                </Suspense>
              </button>
            </div>
          </div>
        );
      })}
    </div>
    <div className={classes.actions}>
      <button className="secondary" onClick={onSubmitSelected}>
        Continue with selected
      </button>
    </div>
  </div>
);

export default AlgorithmSelectorSelectedAlgorithms;
