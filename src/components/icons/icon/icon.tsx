import { ComponentChildren } from 'preact';
import classes from './icon.module.scss';

interface Props {
  children: ComponentChildren;
  sizeLess?: boolean;
}

const Icon = ({ children, sizeLess = false }: Props) => {
  return (
    <div className={classes.icon} data-size-less={sizeLess}>
      {children}
    </div>
  );
};

export default Icon;
