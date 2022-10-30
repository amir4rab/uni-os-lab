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
        <p>loading</p>
      ) : (
        <div className={classes.chart}>
          {title && <h3 className={classes.title}>{title}</h3>}
          {data.length !== 0 && (
            <svg viewBox="0 0 50 100" width={'100%'} height={'10rem'}>
              {data.map(({ v, name }, i) => (
                <>
                  <rect
                    key={i + i.toString() + 'Rect'}
                    x={i * itemWidth + (i + 1) * itemWidth - 50}
                    y={100 - (v * 100) / maxHeight}
                    height={(v * 100) / maxHeight}
                    width={itemWidth}
                    className={classes.box}
                  />
                  <text
                    key={i + i.toString() + 'Text'}
                    x={i * itemWidth + (i + 1) * itemWidth + itemWidth / 4 - 50}
                    y={100 - (v * 100) / maxHeight - 5}
                    className={classes.name}
                  >
                    {name}
                  </text>
                  <text
                    key={i + i.toString() + 'Value'}
                    x={i * itemWidth + (i + 1) * itemWidth - itemWidth / 2 - 50}
                    y={100 - (v * 100) / maxHeight + 5}
                    className={classes.value}
                  >
                    {v}
                  </text>
                </>
              ))}
            </svg>
          )}
          {better && <p className={classes.footer}>{`${better} is better.`}</p>}
        </div>
      )}
    </>
  );
};

export default Chart;
