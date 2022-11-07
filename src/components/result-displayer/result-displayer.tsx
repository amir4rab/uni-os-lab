import ProcessResult from '../../types/process-results';
import GanttChart from './gantt-chart';
import classes from './result-displayer.module.scss';

interface Props {
  data: ProcessResult;
  onReset: () => void;
  goBack: () => void;
}

const ResultDisplayer = ({ data, onReset, goBack }: Props) => {
  return (
    <div className={classes.resultDisplayer}>
      <h1 className={classes.title}>Processes result</h1>
      <GanttChart gantt={data.gantt} />
      <div className={classes.subDetails}>
        <p>
          <b>Average Response Time: </b>
          <span>{`${data.averageResponseTime}ms`}</span>
        </p>
        <p>
          <b>Average Return Time: </b>
          <span>{`${data.averageReturnTime}ms`}</span>
        </p>
      </div>
      <div className={classes.actions}>
        <button
          className="secondary"
          onClick={() => goBack()}
          style="margin-right:auto;"
        >
          Go back
        </button>
        <button className="primary" onClick={onReset}>
          Reset
        </button>
      </div>
    </div>
  );
};

export default ResultDisplayer;
