import { useEffect, useState } from 'preact/hooks';

// styles
import classes from './result-gallery.module.scss';

// hooks
import useAlgorithm from '../../hooks/use-algorithm';

// types
import type ProcessArray from '../../types/process';
import type ProcessResult from '../../types/process-results';
import type SchedulingAlgorithm from '../../types/scheduling-algorithm';

// components
import { ChartsGroup } from '../chart';
import GanttChart from '../gantt-chart';

interface Props {
  data: ProcessArray;
  goBack: () => void;
  onReset: () => void;
  timeSlice: number;
  algorithms: SchedulingAlgorithm[];
}

interface AverageTimeItem {
  v: number;
  name: string;
}

const ResultGallery = ({
  data,
  goBack,
  onReset,
  timeSlice,
  algorithms,
}: Props) => {
  const { process } = useAlgorithm();
  const [activeAlgorithms, setActiveAlgorithms] = useState(
    new Array(algorithms.length).fill(true, 0, algorithms.length),
  );
  const [averageReturnTimes, setAverageReturnTimes] = useState<
    AverageTimeItem[]
  >([]);
  const [averageResponseTimes, setAverageResponseTimes] = useState<
    AverageTimeItem[]
  >([]);
  const [processResults, setProcessResults] = useState<
    { algorithm: string; data: ProcessResult }[]
  >([]);

  useEffect(() => {
    setProcessResults([]);
    setAverageReturnTimes([]);
    setAverageResponseTimes([]);

    algorithms.map((algorithm) => {
      const { averageResponseTime, averageReturnTime, gantt } = process({
        algorithm,
        processes: [...data],
        timeSlice,
      });

      setProcessResults((curr) => [
        ...curr,
        {
          algorithm,
          data: { averageResponseTime, averageReturnTime, gantt },
        },
      ]);

      setAverageReturnTimes((curr) => [
        ...curr,
        { name: algorithm, v: averageReturnTime },
      ]);
      setAverageResponseTimes((curr) => [
        ...curr,
        { name: algorithm, v: averageResponseTime },
      ]);
    });
  }, [data, timeSlice]);

  return (
    <div className={classes.resultGallery}>
      <h1 className={classes.title}>Processes result</h1>
      {algorithms.length > 1 && (
        <>
          <ChartsGroup
            items={[
              {
                data: {
                  data: averageReturnTimes,
                  better: 'less',
                },
                title: 'Average Return Time',
              },
              {
                data: {
                  data: averageResponseTimes,
                  better: 'less',
                },
                title: 'Average Response Time',
              },
            ]}
          />
          <div className={classes.filters}>
            <p className={classes.filtersTitle}>Displayed algorithms</p>
            <div className={classes.chipsWrapper}>
              {activeAlgorithms.map((v, i) => (
                <button
                  className={classes.chip}
                  data-active={v}
                  onClick={() =>
                    setActiveAlgorithms((curr) => {
                      const newArr = [...curr];
                      newArr[i] = !curr[i];
                      return newArr;
                    })
                  }
                >
                  {algorithms[i]}
                </button>
              ))}
            </div>
          </div>
        </>
      )}
      {processResults.map(({ algorithm, data }, i) => {
        const { averageResponseTime, averageReturnTime, gantt } = data;

        return (
          <div
            id={algorithm}
            className={classes.item}
            data-displayed={activeAlgorithms[i]}
          >
            <h2 className={classes.subtitle}>{algorithm}</h2>
            <GanttChart gantt={gantt} />
            <div className={classes.subDetails}>
              <p>
                <span>Average Response Time: </span>
                <span>{`${averageResponseTime}ms`}</span>
              </p>
              <p>
                <span>Average Return Time: </span>
                <span>{`${averageReturnTime}ms`}</span>
              </p>
            </div>
          </div>
        );
      })}
      <div className={classes.actions}>
        <button onClick={() => goBack()} className="secondary">
          Go back
        </button>
        <button onClick={onReset} style="flex-grow: 1;" className="primary">
          Reset
        </button>
      </div>
    </div>
  );
};

export default ResultGallery;
