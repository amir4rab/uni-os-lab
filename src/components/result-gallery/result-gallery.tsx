import { useEffect, useState } from 'preact/hooks';
import useAlgorithm from '../../hooks/use-algorithm';
import ProcessArray from '../../types/process';
import ProcessResult from '../../types/process-results';
import SchedulingAlgorithm from '../../types/scheduling-algorithm';
import Chart from '../chart';
import GanttChart from '../result-displayer/gantt-chart';
import classes from './result-gallery.module.scss';

interface Props {
  data: ProcessArray;
  goBack: () => void;
  onReset: () => void;
  timeSlice: number;
}

const processes: SchedulingAlgorithm[] = [
  'fcfs',
  'priority',
  'sjf',
  'round-robin',
];

interface AverageTimeItem {
  v: number;
  name: string;
}

const ResultGallery = ({ data, goBack, onReset, timeSlice }: Props) => {
  const { process } = useAlgorithm();
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

    processes.map((algorithm) => {
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

      console.log(averageReturnTime, averageResponseTime);

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

  // infinite loops
  return (
    <div className={classes.resultGallery}>
      <h1 className={classes.title}>Processes result</h1>
      <Chart
        data={averageReturnTimes}
        better="less"
        title="Average Return Time per algorithm"
      />
      <Chart
        data={averageResponseTimes}
        better="less"
        title="Average Response Time per algorithm"
      />
      {processResults.map(({ algorithm, data }) => {
        const { averageResponseTime, averageReturnTime, gantt } = data;
        // processes.map((algorithm) => {
        //   const { averageResponseTime, averageReturnTime, gantt } = process({
        //     algorithm,
        //     processes: [...data],
        //     timeSlice,
        //   });

        // console.log('Here');

        // setAverageReturnTimes((curr) => [
        //   ...curr,
        //   { name: algorithm, v: averageReturnTime },
        // ]);
        // setAverageResponseTimes((curr) => [
        //   ...curr,
        //   { name: algorithm, v: averageResponseTime },
        // ]);
        // submitItem(averageReturnTime, algorithm, 'averageReturn');

        return (
          <div id={algorithm} className={classes.item}>
            <h2 className={classes.subtitle}>{algorithm}</h2>
            <GanttChart gantt={gantt} />
            <div className={classes.subDetails}>
              <p>
                <b>Average Response Time: </b>
                <span>{`${averageResponseTime}ms`}</span>
              </p>
              <p>
                <b>Average Return Time: </b>
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
        <button onClick={onReset} className="primary">
          Reset
        </button>
      </div>
    </div>
  );
};

export default ResultGallery;
