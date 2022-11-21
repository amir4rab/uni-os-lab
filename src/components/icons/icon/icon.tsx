import { ComponentChildren } from 'preact';
import classes from './icon.module.scss';

interface Props {
  children: ComponentChildren;
  sizeLess?: boolean;
  className?: string;
}

export interface PassableProps {
  className?: string;
}

const Icon = ({ children, sizeLess = false, className }: Props) => {
  return (
    <div className={[classes.icon, className].join(' ')} data-size-less={sizeLess}>
      {children}
    </div>
  );
};

export default Icon;
