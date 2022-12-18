import type { ComponentChildren } from 'preact';
import {
  useRef,
  useEffect,
  StateUpdater,
  useState,
  useCallback,
} from 'preact/hooks';
import { lazy, Suspense } from 'preact/compat';

import classes from './dialog.module.scss';

// dynamic components
const DialogPolyfill = lazy(() => import('../dialog-polyfill'));

// hooks
import useDialogSupported from '../../hooks/use-dialog-supported';
import { useTranslation } from '../../i18n';

interface Props {
  state: boolean;
  children: ComponentChildren;
  title: string;
  setState: StateUpdater<boolean>;
  disableAnimations?: boolean;
  closeImmediately?: boolean;
  className?: string;
}

const Dialog = ({
  children,
  state,
  title,
  setState,
  disableAnimations = false,
  closeImmediately = false,
  className,
}: Props) => {
  const elRef = useRef<HTMLDialogElement | null>(null);
  const dialogIsSupported = useDialogSupported();
  const [polyfillState, setPolyfillState] = useState(false);
  const {t} = useTranslation('common');

  useEffect(() => {
    let timeOut: undefined | NodeJS.Timeout | number;
    if (state) {
      elRef.current && elRef.current.showModal();
      !dialogIsSupported && setPolyfillState(true);
    } else {
      if (closeImmediately) {
        elRef.current && elRef.current.close();
      } else {
        timeOut = setTimeout(() => elRef.current && elRef.current.close(), 150);
      }
      !dialogIsSupported && setPolyfillState(false);
    }
    () => {
      timeOut && clearTimeout(timeOut);
    };
  }, [state]);

  const onClose = useCallback(() => setState(false), []);

  useEffect(() => {
    elRef.current?.addEventListener('close', onClose);

    return () => {
      elRef.current?.removeEventListener('close', onClose);
    };
  }, [elRef.current]);

  return (
    <>
      {dialogIsSupported === true && (
        <dialog
          data-displayed={state}
          data-disabled-animation={disableAnimations}
          className={[classes.dialog, className].join(' ')}
          ref={elRef}
        >
          <div className={classes.header}>
            <p className={classes.title}>{title}</p>
            <button className={classes.close} onClick={() => setState(false)}>
              {t('close')}
            </button>
          </div>
          <div className={classes.content}>{children}</div>
        </dialog>
      )}
      {dialogIsSupported === false && polyfillState && (
        <Suspense fallback={null}>
          <DialogPolyfill displayed={polyfillState} className={classes.dialog}>
            <div className={classes.header}>
              <p className={classes.title}>{title}</p>
              <button
                className={classes.close}
                onClick={() => {
                  setPolyfillState(false);
                  setState(false);
                }}
              >
                {t('close')}
              </button>
            </div>
            <div className={classes.content}>{children}</div>
          </DialogPolyfill>
        </Suspense>
      )}
    </>
  );
};

export default Dialog;
