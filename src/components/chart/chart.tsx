import { useEffect, useState } from 'preact/hooks';
import classes from './chart.module.scss';

export interface Props {
  better?: 'less' | 'more';
  title?: string;
  data: {
    v: number;
    name: string;
  }[];
  marginLess?: boolean;
  printable?: boolean;
}

const Chart = ({
  data,
  better,
  title,
  marginLess,
  printable = true,
}: Props) => {
  const [maxWidth, setMaxWidth] = useState<null | number>(null);
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

    setMaxWidth(max);
    if (min !== null && max !== null)
      setEdgeValues({
        min,
        max,
      });
  }, [data.length]);

  return (
    <>
      {maxWidth === null ? (
        <p className={classes.alert}>loading</p>
      ) : maxWidth === 0 ? (
        <p className={classes.alert}>Failed to draw a chart</p>
      ) : (
        <div className={classes.chart} data-margin-less={marginLess}>
          {title && <h3 className={classes.title}>{title}</h3>}
          <div className={classes.barsWrapper}>
            {data.map(({ v, name }, i) => {
              const isHighlighted =
                (better === 'less' && v === edgeValues?.min) ||
                (better === 'more' && v === edgeValues?.max);

              const transformAmount = (v * 100) / maxWidth;

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
                          transformAmount < 100 ? transformAmount : 100
                        }%, 0)`}
                      />
                    </div>
                  </div>
                  <p>
                    <span className={classes.value}>{`${v}ms`}</span>
                    <span className={classes.name}>{name}</span>
                  </p>
                </div>
              );
            })}
          </div>
          <div className={classes.footer}>
            {printable && (
              <button data-compact data-secondary>
                Print
              </button>
            )}
            {better && (
              <p className={classes.footerText}>{`${better} is better.`}</p>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Chart;
