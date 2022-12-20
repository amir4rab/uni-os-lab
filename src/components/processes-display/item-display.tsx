import { useEffect, useRef, useState } from 'preact/hooks';

// types
import type { Process } from '../../types/process';
import type SchedulingAlgorithm from '../../types/scheduling-algorithm';

// i18n
import { useTranslation } from '../../i18n';

// icons
import { DeleteIcon, DownArrowIcon, UpArrowIcon } from '../icons';

// classes
import classes from './processes-display.module.scss';

// utils 
import { isFeedBackQueue, isMultiLevel, isPriority } from './utils';

const ItemDisplay = ({
  deleteItem,
  i,
  moveItem,
  p,
  processesLength,
  algorithms,
}: {
  p: Process;
  moveItem: (d: 'up' | 'down', i: number) => void;
  deleteItem: (i: number) => void;
  processesLength: number;
  i: number;
  algorithms: SchedulingAlgorithm[];
}) => {
  const {t} = useTranslation('process');
  const { name, arrivalTime, duration, id, priority, type, cpuBursts, ioBursts } = p;
  const elRef = useRef<HTMLDivElement | null>(null);
  const [expanded, setExpanded] = useState(false);
  let timeout: number | undefined | NodeJS.Timeout;

  useEffect(() => {
    // clearing timeout upon element removal
    return () => timeout && clearTimeout(timeout);
  }, []);

  const recentlyMoved = () => {
    // verifying element existence and then selecting it
    if (elRef.current === null) return;
    const div = elRef.current;

    // setting attribute
    div.setAttribute('data-recently-moved', 'true');

    // clearing previous timeout if existed
    timeout && clearTimeout(timeout);

    // setting a new timeout
    timeout = setTimeout(() => div.removeAttribute('data-recently-moved'), 300);
  };

  return (
    <div ref={elRef} className={classes.item}>
      <div className={classes.mainInfo}>
        <p className={classes.name}>{name}</p>
        <button onClick={() => setExpanded((curr) => !curr)}>i</button>
      </div>
      <div className={classes.processActions}>
        <button  
          data-type='delete' 
          onClick={() => deleteItem(i)} 
          data-compact
        >
          <DeleteIcon />
        </button>
        <button
          onClick={() => {
            recentlyMoved();
            moveItem('up', i);
          }}
          data-compact
          disabled={i === 0}
        >
          <UpArrowIcon />
        </button>
        <button
          onClick={() => {
            recentlyMoved();
            moveItem('down', i);
          }}
          data-compact
          disabled={i + 1 >= processesLength}
        >
          <DownArrowIcon />
        </button>
      </div>
      <div className={classes.subInfo} data-shown={expanded ? true : undefined}>
        <p className={classes.subInfoGroup}>
          <span className={classes.subInfoName}>{t('at')}</span>
          <span>{`${arrivalTime}ms`}</span>
        </p>
        <p className={classes.subInfoGroup}>
          <span className={classes.subInfoName}>{t('et')}</span>
          <span>{`${duration}ms`}</span>
        </p>
        <p className={classes.subInfoGroup}>
          <span className={classes.subInfoName}>{`ID: `}</span>
          <span>{id}</span>
        </p>
        {
          isPriority(algorithms) && (
            <p className={classes.subInfoGroup}>
              <span className={classes.subInfoName}>{t('priority')}</span>{' '}
              <span>{priority}</span>
            </p>
          )
        }
        { isMultiLevel(algorithms) && (
          <p className={classes.subInfoGroup}>
            <span className={classes.subInfoName}>{t('pt')}</span>{' '}
            <span>{t(type)}</span>
          </p>
        )}
        { isFeedBackQueue(algorithms) && (
          <>
            <p className={classes.subInfoGroup}>
              <span className={classes.subInfoName}>{t('cb')}</span>{' '}
              <span>{t(ioBursts)}</span>
            </p>
            <p className={classes.subInfoGroup}>
              <span className={classes.subInfoName}>{t('ib')}</span>{' '}
              <span>{t(cpuBursts)}</span>
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default ItemDisplay;