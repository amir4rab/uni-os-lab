import { MutableRef } from "preact/hooks";
import classes from "./select.module.scss";

interface Props {
  name: string;
  type?: string;
  id?: string;
  defaultValue?: string;
  passedRef?: MutableRef<null | HTMLSelectElement>;
  required?: boolean;
  options: {
    value: string;
    name: string
  }[]
};

const Select = ({ options, name , passedRef, ...props }: Props) => (
  <div className={classes.selectWrapper}>
    <label htmlFor={name}>{ name }</label>
    <select ref={passedRef} {...props}>
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