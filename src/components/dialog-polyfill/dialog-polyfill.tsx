import type { ComponentChildren } from 'preact';
import { createPortal } from 'preact/compat';
import classes from './dialog-polyfill.module.scss';

interface Props {
  displayed: boolean;
  children: ComponentChildren;
  className: string;
}

const DialogPolyfill = ({ children, displayed, className }: Props) => {
  const container = document.getElementById(
    'dialog-polyfill',
  ) as HTMLDivElement;

  return createPortal(
    <>
      <div
        className={[classes.dialogPolyfill, className].join(' ')}
        data-state={displayed}
      >
        {children}
      </div>
      <div className={classes.backdrop} data-state={displayed} />
    </>,
    container,
  );
};

export default DialogPolyfill;
