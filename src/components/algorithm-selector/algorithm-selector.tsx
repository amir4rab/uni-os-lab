import { useEffect, useRef, useState } from 'preact/hooks';

// styles
import classes from './algorithm-selector.module.scss';

// types
import SchedulingAlgorithm from '../../types/scheduling-algorithm';

// components
import Checkbox from '../checkbox';

// data
import { algorithms } from './algorithms-data';

interface Props {
  onSubmit: (v: SchedulingAlgorithm[]) => void;
}

const AlgorithmSelector = ({ onSubmit }: Props) => {
  const [selectedAlgorithms, setSelectedAlgorithms] = useState<
    (SchedulingAlgorithm | null)[]
  >(new Array(algorithms.length).fill(null, 0, algorithms.length));
  const [expandedIndex, setExpandedIndex] = useState(-1);
  const [customMode, setCustomMode] = useState<boolean | null>(null);
  const [elHeight, setElHeight] = useState(0);

  const expertModeElRef = useRef<null | HTMLDivElement>(null);
  const customModeElRef = useRef<null | HTMLDivElement>(null);

  const toggleAlgorithm = (
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

  useEffect(() => {
    const height = 
      customMode === true ?
      customModeElRef.current?.getBoundingClientRect().height:
      expertModeElRef.current?.getBoundingClientRect().height;
    height && setElHeight(height);
  }, [customMode])

  return (
    <div>
      <h3 className={classes.title}>Please select a Scheduling Algorithm</h3>
      <div className={classes.contentWrapper} style={`height:${elHeight}px`}>
        <div 
          data-displayed={customMode === null ? true : !customMode} 
          className={classes.algorithmWrapper}
          ref={expertModeElRef}
        >
          <div className={classes.header}>
            <h4 className={classes.title}>Expert mode</h4>
          </div>
          <p className={classes.about}>
            Processes your data with every possible algorithm
          </p>
          <div className={classes.submitWrapper}>
            <button
              onClick={() => onSubmit(algorithms.map(({ id }) => id))}
              className="primary"
            >
              Select
            </button>
          </div>
          <div className={classes.divider}/>
          <p className={classes.about}>Or mix and match your favorite algorithms with custom mode</p>
          <div className={classes.submitWrapper}>
            <button
              onClick={() => setCustomMode(true)}
              className="secondary"
            >
              Custom Mode
            </button>
          </div>
        </div>
        <div
          data-displayed={customMode === null ? undefined : customMode}
          className={classes.algorithmWrapper}
          ref={customModeElRef}
        >
          <div className={classes.header}>
            <button onClick={() => setCustomMode(false)} className={classes.backButton}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                <title>Chevron Back</title>
                <path 
                  fill="none"
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth="48" 
                  d="M328 112L184 256l144 144"
                />
              </svg>
            </button>
            <h4 className={classes.title}>Custom mode</h4>
          </div>
          {algorithms.map(({ id, name, shortInfo }, i) => (
            <div
              key={id}
              data-expanded={i === expandedIndex ? true : undefined}
              className={classes.item}
            >
              <div className={classes.header}>
                <Checkbox
                  id={id + '-checkbox'}
                  onChange={(v) => {
                    toggleAlgorithm(id, v, i);
                  }}
                  outerState={selectedAlgorithms[i] !== null}
                />
                <h4
                  onClick={() => {
                    toggleAlgorithm(id, selectedAlgorithms[i] === null, i);
                  }}
                  className={classes.title}
                  style="margin-left: .5rem;"
                  data-clickable
                >
                  {name}
                </h4>
                <button
                  onClick={() =>
                    setExpandedIndex((curr) => (curr !== i ? i : -1))
                  }
                >
                  {expandedIndex === i ? 'Show less' : 'More info'}
                </button>
              </div>
              <p className={classes.about}>{shortInfo}</p>
            </div>
          ))}
          <div className={classes.algorithmsFooter}>
            <button
              disabled={
                selectedAlgorithms.filter((i) => i !== null).length === 0
              }
              className="secondary"
              onClick={() =>
                selectedAlgorithms.length !== 0 &&
                onSubmit(
                  selectedAlgorithms.filter(
                    (i) => i !== null,
                  ) as SchedulingAlgorithm[],
                )
              }
            >
              Continue with selected
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlgorithmSelector;
