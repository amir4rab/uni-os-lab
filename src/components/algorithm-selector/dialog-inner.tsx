import { useState } from 'preact/hooks';
import { lazy, Suspense } from 'preact/compat';

// classes
import classes from './dialog-inner.module.scss';

// types
import SchedulingAlgorithm from '../../types/scheduling-algorithm';

// data
import { algorithms } from './algorithms-data';

// hooks
import useDialogSupported from '../../hooks/use-dialog-supported';

// components
import Checkbox from '../checkbox';

// lazy components
const XCircle = lazy(() => import('../icons/components/x-circle'));
const SearchIcon = lazy(() => import('../icons/components/search'));

interface Props {
  selectedAlgorithms: (SchedulingAlgorithm | null)[];
  toggle: (
    algorithm: SchedulingAlgorithm,
    toggleV: boolean,
    index: number,
  ) => void;
}

const AlgorithmSelectorDialogInner = ({
  selectedAlgorithms,
  toggle,
}: Props) => {
  const [searchQuery, setSearchQuery] = useState('');
  const searchFiled = useDialogSupported();

  return (
    <div className={classes.algorithmSelectorDialogInner}>
      <div className={classes.header}>
        <h4 className={classes.title}>Select algorithms</h4>
        {searchFiled && (
          <div className={classes.searchWrapper}>
            <SearchIcon className={classes.searchIcon} />
            <input
              placeholder={'Search'}
              onChange={(e) =>
                e.target && setSearchQuery((e.target as HTMLInputElement).value)
              }
              value={searchQuery}
            />
            <button
              data-displayed={searchQuery.trim() !== ''}
              className={classes.backspaceIcon}
              onClick={() => setSearchQuery('')}
            >
              <Suspense fallback={null}>
                <XCircle />
              </Suspense>
            </button>
          </div>
        )}
      </div>
      <div className={classes.contentWrapper}>
        {algorithms.map(({ id, name, shortInfo }, i) => {
          if (!name.toLowerCase().includes(searchQuery.trim().toLowerCase()))
            return null;
          return (
            <div key={id} className="dialog-item">
              <div className="item-header">
                <p className="item-title">{name}</p>
                <Checkbox
                  outerState={selectedAlgorithms[i] !== null}
                  onChange={(v) => toggle(id, v, i)}
                  id={id + '-checkbox'}
                />
              </div>
              <div className="item-description">{shortInfo}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AlgorithmSelectorDialogInner;
