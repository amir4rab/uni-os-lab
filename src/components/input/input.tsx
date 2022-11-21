import { MutableRef } from "preact/hooks";
import classes from "./input.module.scss";

interface Props {
  name: string;
  type?: string;
  id?: string;
  defaultValue?: string;
  passedRef?: MutableRef<null | HTMLInputElement>;
  required?: boolean;
  min?: number;
  max?: number
};

const Input = ({ name, passedRef, ...props }: Props) => (
  <div className={classes.inputWrapper}>
    <label htmlFor={name}>{ name }</label>
    <input ref={passedRef} name={name} {...props}/>
  </div>
);

export default Input;