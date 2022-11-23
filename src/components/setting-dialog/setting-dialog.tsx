import { useRef, useEffect, StateUpdater, useState } from 'preact/hooks';
import { lazy, Suspense } from 'preact/compat';
import classes from './setting-dialog.module.scss';

// data
import { version } from '../../../package.json';
version as string;

// components
import Checkbox from '../checkbox';
import useSettings from './use-setting';
import ColorSelector from '../color-selector';

// hooks
import DialogExpanded from '../dialog-expanded';

interface Props {
  state: boolean;
  setState: StateUpdater<boolean>;
}

const SettingDialog = (props: Props) => {
  const {
    accentColors,
    colorScheme,
    disableBlur,
    setAccentColor,
    setColorScheme,
    setDisableBlur,
  } = useSettings();

  return (
    <DialogExpanded
      title='Settings'
      { ...props }
    >
      <>
        {/* Disable blur */}
        <div className='dialog-item'>
          <div className='item-header'>
            <h4 className='item-title'>Disable blur</h4>
            <Checkbox
              id="disable-blur"
              outerState={disableBlur}
              onChange={setDisableBlur}
            />
          </div>
          <p className='item-description'>
            Disable blur incase of performance problems in older devices.
          </p>
        </div>
        {/* Accent colour */}
        <div className='dialog-item'>
          <div className='item-header'>
            <h4 className='item-title'>Accent colour</h4>
            <div className={classes.beta}>Beta</div>
          </div>
          <p className='item-description'>
            Change accent colour to your liking.
          </p>
          <div className={classes.groupActions}>
            <ColorSelector onSelect={setAccentColor} colors={accentColors} />
          </div>
        </div>
        {/* Colour scheme */}
        <div className='dialog-item'>
          <div className='item-header'>
            <h4 className='item-title'>Colour scheme</h4>
            <div className={classes.beta}>Beta</div>
          </div>
          <p className='item-description'>
            We are on the dark side, you too?
          </p>
          <div className='item-actions'>
            <ColorSelector
              onSelect={(v: string) => {
                if (v === 'fff') {
                  setColorScheme('light');
                } else if (v === '000') {
                  setColorScheme('dark');
                }
              }}
              colors={[
                {
                  hexCode: '000',
                  name: 'dark',
                  selected: colorScheme === 'dark',
                },
                {
                  hexCode: 'fff',
                  name: 'light',
                  selected: colorScheme === 'light',
                },
              ]}
            />
          </div>
        </div>
        {/* About */}
        <div className='dialog-item'>
          <div className='item-header'>
            <h4 className='item-title'>Version</h4>
          </div>
          <p className='item-description'>
            {`You are running version ${version}.`}
          </p>
        </div>
      </>
    </DialogExpanded>
  );
};

export default SettingDialog;
