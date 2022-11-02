import type { ComponentChildren } from 'preact';
import { useRef, useEffect, StateUpdater } from 'preact/hooks';
import { CloseIcon } from '../icons';
import classes from './dialog.module.scss';

interface Props {
  state: boolean;
  children: ComponentChildren;
  title: string;
  setState: StateUpdater<boolean>;
}

const Dialog = ({ children, state, title, setState }: Props) => {
  const elRef = useRef<HTMLDialogElement | null>(null);

  useEffect(() => {
    let timeOut: undefined | NodeJS.Timeout | number;
    if (state) {
      elRef.current && elRef.current.showModal();
    } else {
      timeOut = setTimeout(() => elRef.current && elRef.current.close(), 500);
    }
    () => {
      console.log('Clearing');
      timeOut && clearTimeout(timeOut);
    };
  }, [state]);

  return (
    <dialog data-displayed={state} className={classes.dialog} ref={elRef}>
      <div className={classes.header}>
        <p className={classes.title}>{title}</p>
        <button className={classes.close} onClick={() => setState(false)}>
          close
        </button>
      </div>
      <div className={classes.content}>{children}</div>
    </dialog>
  );
};

export default Dialog;
