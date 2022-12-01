import { lazy, Suspense } from 'preact/compat';
import { StateUpdater } from 'preact/hooks';

// classes
import classes from './setting-dialog.module.scss';

// data
import { version } from '../../../package.json';
version as string;

// components
import ColorSelector from '../color-selector';

const DialogExpanded = lazy(() => import('../dialog-expanded'));

// hooks
import useSettings from './use-setting';

interface Props {
  state: boolean;
  setState: StateUpdater<boolean>;
}

const SettingDialog = (props: Props) => {
  const {
    accentColors,
    colorScheme,
    disableBlur,
    disableTransform,
    setDisableTransform,
    setAccentColor,
    setColorScheme,
    setDisableBlur,
  } = useSettings();

  return (
    <Suspense fallback={null}>
      <DialogExpanded title="Settings" {...props}>
        <>
          {/* Colour scheme */}
          <div className="dialog-item">
            <div className="item-header">
              <h4 className="item-title">Colour scheme</h4>
              <div className={classes.beta}>Beta</div>
            </div>
            <p className="item-description">
              We are on the dark side, you too?
            </p>
            <div className="item-actions">
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
          {/* Accent colour */}
          <div className="dialog-item">
            <div className="item-header">
              <h4 className="item-title">Accent colour</h4>
              <div className={classes.beta}>Beta</div>
            </div>
            <p className="item-description">
              Change accent colour to your liking.
            </p>
            <div className="item-actions">
              <ColorSelector onSelect={setAccentColor} colors={accentColors} />
            </div>
          </div>
          {/* Disable blur */}
          <div className="dialog-item">
            <div className="item-header">
              <h4 className="item-title">Disable blur</h4>
              <input
                type="checkbox"
                checked={disableBlur}
                data-radio
                data-size="s"
                onChange={(e) =>
                  e.target &&
                  setDisableBlur((e.target as HTMLInputElement).checked)
                }
              />
            </div>
            <p className="item-description">
              Disable blur incase of performance problems in older devices.
            </p>
          </div>
          {/* Disable transform */}
          <div className="dialog-item">
            <div className="item-header">
              <h4 className="item-title">Disable transform</h4>
              <input
                type="checkbox"
                checked={disableTransform}
                data-radio
                data-size="s"
                onChange={(e) =>
                  e.target &&
                  setDisableTransform((e.target as HTMLInputElement).checked)
                }
              />
            </div>
            <p className="item-description">
              Disable transform incase of performance problems in older devices,
              or your personal preference.
            </p>
          </div>
          {/* About */}
          <div className="dialog-item">
            <div className="item-header">
              <h4 className="item-title">Version</h4>
            </div>
            <p className="item-description">
              <span>{`You are running version "`}</span>
              <code>{version}</code>
              <span>{`".`}</span>
            </p>
          </div>
        </>
      </DialogExpanded>
    </Suspense>
  );
};

export default SettingDialog;
