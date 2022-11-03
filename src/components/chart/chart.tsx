import { useEffect, useState } from 'preact/hooks';
import classes from './chart.module.scss';

interface Props {
  better?: 'less' | 'more';
  title?: string;
  data: {
    v: number;
    name: string;
  }[];
}

const getShortName = (n: string) => {
  switch (n) {
    case 'round-robin':
      return 'RR';
    case 'priority':
      return 'P';
    case 'sjf':
      return 'SJF';
    case 'fcfs':
      return 'FCFS';
    default:
      return n;
  }
};

const Chart = ({ data, better, title }: Props) => {
  const [maxHeight, setMaxHeight] = useState<null | number>(null);
  const [itemWidth, setItemWidth] = useState<null | number>(null);

  useEffect(() => {
    let biggestItem = 0;
    data.forEach(({ v }) => {
      if (biggestItem < v) biggestItem = v;
    });
    setMaxHeight(biggestItem * 1.5);
    setItemWidth(100 / (data.length + 1));
  }, [data.length]);

  return (
    <>
      {maxHeight === null || itemWidth === null ? (
        <p className={classes.alert}>loading</p>
      ) : maxHeight === 0 ? (
        <p className={classes.alert}>Failed to draw a chart</p>
      ) : (
        <div className={classes.chart}>
          {title && <h3 className={classes.title}>{title}</h3>}
          <div className={classes.chartWrapper}>
            {data.length !== 0 && (
              <div
                className={classes.barWrapper}
                style={`width:${data.length * 2 + (data.length + 1) * 1}rem`}
              >
                {data.map(({ v, name }, i) => (
                  <div
                    key={i + i.toString() + 'Rect'}
                    style={`
                      left:${i * 2 + (i + 1) * 1}rem;
                      height:${(v * 100) / maxHeight / 10}rem;
                      top:${100 - (v * 100) / maxHeight}%;
                    `}
                    className={classes.box}
                  >
                    <div className={classes.barInner}>
                      <p className={classes.name}>{getShortName(name)}</p>
                      <p className={classes.value}>{`${v} \n ms`}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          {better && <p className={classes.footer}>{`${better} is better.`}</p>}
        </div>
      )}
    </>
  );
};

export default Chart;
