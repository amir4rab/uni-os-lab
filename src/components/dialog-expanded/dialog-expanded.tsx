import { useRef, useEffect, StateUpdater, useState } from 'preact/hooks';
import { lazy, Suspense } from 'preact/compat';

// classes
import classes from './dialog-expanded.module.scss';

// dynamic components
const DialogPolyfill = lazy(() => import('../dialog-polyfill'));

// hooks
import useDialogSupported from '../../hooks/use-dialog-supported';
import { ComponentChildren } from 'preact';

interface InnerProps {
  onClose: () => void;
  children: ComponentChildren; 
  title: string;
}
const SettingInner = ({ onClose, children, title }:InnerProps) => {
  return (
    <div className={classes.content}>
      <div className={classes.side}>
        <button className={classes.close} onClick={onClose}>
          close
        </button>
      </div>
      <div className={classes.main}>
        <div className={classes.header}>
          <button className={classes.mobileClose} onClick={onClose}>
            Done
          </button>
          <h3 className={classes.title}>{ title }</h3>
        </div>
        <div className={classes.inner}>
          { children }
        </div>
      </div>
    </div>
  );
};

interface Props {
  state: boolean;
  setState: StateUpdater<boolean>;
  children: ComponentChildren; 
  title: string;
}
const SettingDialog = ({ state, setState, children, title }: Props) => {
  const elRef = useRef<HTMLDialogElement | null>(null);
  const dialogIsSupported = useDialogSupported();
  const [polyfillState, setPolyfillState] = useState(false);
  // const _ = useMinimizeBody({ minimized: state, mobileOnly: true })

  useEffect(() => {
    let timeOut: undefined | NodeJS.Timeout | number;
    if (state) {
      elRef.current && elRef.current.showModal();
      !dialogIsSupported && setPolyfillState(true);
    } else {
      timeOut = setTimeout(() => elRef.current && elRef.current.close(), 500);
      !dialogIsSupported && setPolyfillState(false);
    }
    () => {
      timeOut && clearTimeout(timeOut);
    };
  }, [state]);

  return (
    <>
      {dialogIsSupported === true && (
        <dialog
          data-displayed={state}
          className={classes.settingDialog}
          ref={elRef}
        >
          <div className={classes.inner}>
            <SettingInner
              title={title}
              onClose={() => setState(false)}
            >
              { children }
            </SettingInner>
          </div>
        </dialog>
      )}
      {dialogIsSupported === false && polyfillState && (
        <Suspense fallback={null}>
          <DialogPolyfill
            displayed={polyfillState}
            className={classes.settingDialog}
          >
            <div className={classes.inner}>
              <SettingInner
                title={title}
                onClose={() => setState(false)}
              >
                { children }
              </SettingInner>
            </div>
          </DialogPolyfill>
        </Suspense>
      )}
    </>
  );
};

export default SettingDialog;
