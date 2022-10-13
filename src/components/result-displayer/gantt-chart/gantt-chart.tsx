import Gantt from '../../../types/gannt';
import classes from './gantt-chart.module.scss';

const ChartItem = ({
  end,
  endTime,
  index,
  name,
  start,
}: {
  start: number;
  end: number;
  name: string;
  endTime: number;
  index: number;
}) => {
  return (
    <div
      className={classes.item}
      style={`width: ${(endTime / (end - start)) * 100}%`}
    >
      <p className={classes.title}>{name}</p>
      {index === 0 && <p className={classes.leftIndicator}>{start}</p>}
      {<p className={classes.rightIndicator}>{end}</p>}
    </div>
  );
};

const GanttChart = ({ gantt }: { gantt: Gantt }) => {
  const processEndTime = gantt[gantt.length - 1].endTime;

  return (
    <div>
      <p>Gantt chart</p>
      <div className={classes.ganttChart}>
        {gantt.map(({ endTime, id, processName, startTime }, i) => (
          <>
            {i !== 0 && startTime !== gantt[i - 1].endTime && (
              <ChartItem
                start={gantt[i - 1].endTime}
                end={startTime}
                endTime={processEndTime}
                index={i}
                key={id + '-spacer'}
                name="Free time"
              />
            )}
            <ChartItem
              end={endTime}
              start={startTime}
              name={processName}
              endTime={processEndTime}
              index={i}
              key={id}
            />
          </>
        ))}
      </div>
    </div>
  );
};

export default GanttChart;
