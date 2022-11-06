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
  const [edgeValues, setEdgeValues] = useState<null | {
    min: number;
    max: number;
  }>(null);

  useEffect(() => {
    let max = 0;
    let min: number | null = null;
    data.forEach(({ v }) => {
      if (max < v) max = v;
      if (min === null) min = v;
      if (min > v) min = v;
    });

    setMaxHeight(max * 1.5);
    setItemWidth(100 / (data.length + 1));
    if (min !== null && max !== null)
      setEdgeValues({
        min,
        max,
      });
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
          <div>
            {data.map(({ v, name }, i) => {
              const isHighlighted =
                (better === 'less' && v === edgeValues?.min) ||
                (better === 'more' && v === edgeValues?.max);

              return (
                <div
                  key={`${i}-${v}`}
                  data-highlighted={isHighlighted}
                  className={classes.item}
                >
                  <div className={classes.progressWrapper}>
                    <div className={classes.progress}>
                      <div
                        className={classes.progressInner}
                        style={`transform: translate(${
                          (v * 80) / maxHeight
                        }%, 0)`}
                      />
                    </div>
                    {isHighlighted && (
                      <div
                        style={`left: ${(v * 80) / maxHeight}%`}
                        className={classes.highlightedComparison}
                      >
                        Fastest
                      </div>
                    )}
                  </div>
                  <p>
                    <span className={classes.name}>{name}</span>
                    <span className={classes.value}>{`${v} \n ms`}</span>
                  </p>
                </div>
              );
            })}
          </div>
          {better && <p className={classes.footer}>{`${better} is better.`}</p>}
        </div>
      )}
    </>
  );
};

export default Chart;
