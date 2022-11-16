// import type { ComponentChildren } from 'preact';
import { useRef, useEffect, StateUpdater, useState } from 'preact/hooks';
import Checkbox from '../checkbox';
// import { lazy, Suspense } from 'preact/compat';
import classes from './setting-dialog.module.scss';


import { version } from '../../../package.json';
version as string;

import useSettings from './use-setting';
import ColorSelector from '../color-selector';

// const DialogPolyfill = lazy(() => import('./dialog-polyfill'));

interface Props {
  state: boolean;
  setState: StateUpdater<boolean>;
}

const SettingInner = ({ onClose }:{onClose: () => void}) => {
  const {
    accentColors,
    colorScheme, 
    disableBlur, 
    setAccentColor, 
    setColorScheme, 
    setDisableBlur
  } = useSettings();

  return (
    <div className={classes.content}>
      <div className={classes.side}>
        <button className={classes.close} onClick={onClose}>
          close
        </button>
      </div>
      <div className={classes.main}>
        <h3 className={classes.title}>Settings</h3>
        <div className={classes.inner}>
          {/* Disable blur */}
          <div className={classes.group}>
            <div className={classes.groupHeader}>
              <h4 className={classes.groupTitle}>
                Disable blur
              </h4>
              <Checkbox id='disable-blur' outerState={disableBlur} onChange={setDisableBlur} />
            </div>
            <p className={classes.groupDescription}>
              Disable blur incase of performance problems in older devices.
            </p>
          </div> 
          {/* Accent colour */}
          <div className={classes.group}>
            <div className={classes.groupHeader}>
              <h4 className={classes.groupTitle}>
                Accent colour
              </h4>
              <div className={classes.beta}>Beta</div>
            </div>
            <p className={classes.groupDescription}>
              Change accent colour to your liking.
            </p>
            <div className={classes.groupActions}>
              <ColorSelector 
                onSelect={setAccentColor}
                colors={accentColors}
              />
            </div>
          </div>
          {/* Colour scheme */}
          <div className={classes.group}>
            <div className={classes.groupHeader}>
              <h4 className={classes.groupTitle}>
                Colour scheme
              </h4>
              <div className={classes.beta}>Beta</div>
            </div>
            <p className={classes.groupDescription}>
              We are on the dark side, you too?
            </p>
            <div className={classes.groupActions}>
              <ColorSelector 
                onSelect={(v: string) => {
                  if ( v === 'fff' ) { setColorScheme('light') } 
                  else if ( v === '000') { setColorScheme('dark') }
                }}
                colors={[
                  { hexCode: '000', name: 'dark', selected: colorScheme === 'dark' },
                  { hexCode: 'fff', name: 'light', selected: colorScheme === 'light' },
                ]}
              />
            </div>
          </div>
          {/* About */}
          <div className={classes.group}>
            <div className={classes.groupHeader}>
              <h4 className={classes.groupTitle}>
                Version
              </h4>
            </div>
            <p className={classes.groupDescription}>
              {`You are running version ${version}.`}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

const SettingDialog = ({ state, setState }: Props) => {
  const elRef = useRef<HTMLDialogElement | null>(null);
  const [dialogIsSupported, setDialogIsSupported] = useState<null | boolean>(
    null,
  );
  const [polyfillState, setPolyfillState] = useState(false);

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

  // Checks if dialog component is supported
  useEffect(() => {
    if (window !== undefined)
      setDialogIsSupported(typeof HTMLDialogElement === 'function');
  }, []);

  return (
    <>
      {dialogIsSupported === true && (
        <dialog data-displayed={state} className={classes.settingDialog} ref={elRef}>
          <div className={classes.inner}>
            <SettingInner onClose={() => setState(false)} />
          </div>
        </dialog>
      )}
      {dialogIsSupported === false && polyfillState && (
        // <Suspense fallback={null}>
        //   <DialogPolyfill displayed={polyfillState} className={classes.dialog}>
        //     <div className={classes.header}>
        //       <p className={classes.title}>{title}</p>
        //       <button
        //         className={classes.close}
        //         onClick={() => {
        //           setPolyfillState(false);
        //           setState(false);
        //         }}
        //       >
        //         close
        //       </button>
        //     </div>
        //     <div className={classes.content}>{children}</div>
        //   </DialogPolyfill>
        // </Suspense>
        <></>
      )}
    </>
  );
};

export default SettingDialog;
