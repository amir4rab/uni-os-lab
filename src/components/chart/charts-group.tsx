import { useState } from 'preact/hooks';

// styling
import classes from './charts-group.module.scss';

// type
import type { Props as ChartProps } from './chart';

// components
import Chart from './chart';

interface Props {
  items: {
    title: string;
    data: ChartProps['data'];
  }[];
}

const ChartsGroup = ({ items }: Props) => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  return (
    <div className={classes.chartsGroup}>
      <div className={classes.actionsWrapper}>
        <div className={classes.actionsGroup}>
          {items.map(({ title }, i) => (
            <button
              key={i}
              onClick={() => setSelectedIndex(i)}
              data-selected={i === selectedIndex}
              data-compact
            >
              {title}
            </button>
          ))}
        </div>
      </div>
      <div className={classes.chartWrapper}>
        {items[selectedIndex] && (
          <Chart
            data={items[selectedIndex].data}
            marginLess={true}
            better="less"
          />
        )}
      </div>
    </div>
  );
};

export default ChartsGroup;
