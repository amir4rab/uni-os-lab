import { useState } from 'preact/hooks';
import classes from './checkbox.module.scss';

interface Props {
  onChange?: (checked: boolean) => any;
  id: string;
  checkedByDefault?: boolean;
}

const Checkbox = ({ id, onChange, checkedByDefault = false }: Props) => {
  const [state, setState] = useState(checkedByDefault);

  return (
    <div className={classes.checkbox}>
      <label for={id}>
        <div className={classes.iconWrapper} data-checked={state}>
          <svg
            className={classes.icon}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
          >
            <title>Checkmark</title>
            <path
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="64"
              d="M416 128L192 384l-96-96"
            />
          </svg>
        </div>
      </label>
      <input
        type="checkbox"
        id={id}
        onChange={(e) => {
          const { checked } = e.target as HTMLInputElement;
          if (typeof checked !== 'boolean') return;
          setState(checked);
          onChange && onChange(checked);
        }}
      />
    </div>
  );
};

export default Checkbox;
