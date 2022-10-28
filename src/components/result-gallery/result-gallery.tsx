import useAlgorithm from '../../hooks/use-algorithm';
import ProcessArray from '../../types/process';
import SchedulingAlgorithm from '../../types/scheduling-algorithm';
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

const ResultGallery = ({ data, goBack, onReset, timeSlice }: Props) => {
  const { process } = useAlgorithm();

  return (
    <div className={classes.resultGallery}>
      <h1 className={classes.title}>Processes result</h1>
      {processes.map((algorithm) => {
        const { averageResponseTime, averageReturnTime, gantt } = process({
          algorithm,
          processes: [...data],
          timeSlice,
        });

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
