import { MutableRef } from "preact/hooks";
import classes from "./select.module.scss";

interface Props {
  name?: string;
  type?: string;
  id?: string;
  marginLess?: boolean;
  defaultValue?: string;
  passedRef?: MutableRef<null | HTMLSelectElement>;
  required?: boolean;
  onUpdate?: (v: string) => void
  options: {
    value: string;
    name: string
  }[]
};

const Select = ({ options, name , passedRef, marginLess, onUpdate, ...props }: Props) => (
  <div className={classes.selectWrapper} data-margin-less={marginLess}>
    { name && <label htmlFor={name}>{ name }</label> }
    <select
      onChange={(e) => {
        const v = (e.target as HTMLSelectElement).value;
        onUpdate && onUpdate(v);
      }}
      ref={passedRef} 
      {...props}
    >
      {
        options.map(({ name, value }) => (
          <option value={ value } key={ value }>
            { name }
          </option>
        ))
      }
    </select>
  </div>
);

export default Select;