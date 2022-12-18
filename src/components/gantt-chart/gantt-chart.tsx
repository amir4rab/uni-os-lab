import { useEffect, useMemo, useState } from 'preact/hooks';

// stylings
import classes from './gantt-chart.module.scss';

// hooks
import useGenerateCSV from '../../hooks/use-generate-csv';
import { useTranslation } from '../../i18n';

// types
import type Gantt from '../../types/gantt';

const lineHeight = 1.75;

const ChartItem = ({
  end,
  start,
  verticalIndex,
  firstItem,
  lastItem,
  startTime,
  endTime,
}: {
  start: number;
  end: number;
  startTime: number;
  endTime: number;
  verticalIndex: number;
  firstItem: boolean;
  lastItem: boolean;
}) => (
  <div
    className={classes.item}
    data-last-item={lastItem}
    data-first-item={firstItem}
    style={`
      top:${verticalIndex * lineHeight}rem;
      width:${end - start}%;
      left:${start}%;
    `}
  >
    <p className={classes.leftSec}>{startTime}</p>
    <p className={classes.rightSec}>{endTime}</p>
  </div>
);

const GanttChart = ({
  gantt,
  debugLogging = false,
}: {
  gantt: Gantt;
  debugLogging?: boolean;
}) => {
  const { ganttToCSV } = useGenerateCSV();
  const [processEndTime] = useState(gantt[gantt.length - 1].endTime);
  const [downloadUrl, setDownloadUrl] = useState<string | undefined>(undefined);
  const [itemCount, setItemCount] = useState(0);
  const [names, setNames] = useState<{ name: string; key: string }[]>([]);
  const {t} = useTranslation('common');

  const items = useMemo(() => {
    setNames([]);
    const itemIndexing = new Map<string, number>();

    const items = gantt.map(
      ({ endTime, id, startTime, ogId, processName }, i) => {
        const key = ogId ? ogId : id;
        let verticalIndexing: number;

        if (itemIndexing.get(key) === undefined) {
          verticalIndexing = itemIndexing.size;
          itemIndexing.set(key, itemIndexing.size);
          setNames((curr) => [...curr, { name: processName, key }]);
        } else {
          const index = itemIndexing.get(key);
          verticalIndexing = index!;
        }

        const start = (startTime * 100) / processEndTime;
        const end = (endTime * 100) / processEndTime;

        return (
          <ChartItem
            firstItem={i === 0}
            lastItem={i === gantt.length - 1}
            verticalIndex={verticalIndexing}
            end={end}
            start={start}
            key={id}
            startTime={startTime}
            endTime={endTime}
          />
        );
      },
    );

    debugLogging && console.debug(itemIndexing);

    setItemCount(itemIndexing.size);

    return items;
  }, []);

  const onCSVGen = () => {
    if (downloadUrl !== undefined) return;

    const blob = ganttToCSV(gantt);

    const url = URL.createObjectURL(blob);

    setDownloadUrl(url);
  };

  // Clearing object url
  useEffect(() => {
    return () => {
      downloadUrl && URL.revokeObjectURL(downloadUrl);
    };
  }, []);

  return (
    <div>
      <div className={classes.header}>
        <p>{t('gantt')}</p>
        {downloadUrl === undefined ? (
          <button onClick={onCSVGen} data-secondary data-compact>
            {t('convertToCSV')}
          </button>
        ) : (
          <a download="Gantt chart" href={downloadUrl}>
            <button data-secondary data-compact>
              {t('download')}
            </button>
          </a>
        )}
      </div>
      <div className={classes.ganttChart}>
        <div className={classes.names}>
          {names.map(({ key, name }, i) => (
            <div
              id={key}
              style={`top:${i * lineHeight}rem;`}
              className={classes.name}
            >
              {name}
            </div>
          ))}
        </div>
        <div
          className={classes.inner}
          style={`height: ${itemCount * lineHeight}rem`}
        >
          {items}
        </div>
      </div>
    </div>
  );
};

export default GanttChart;
