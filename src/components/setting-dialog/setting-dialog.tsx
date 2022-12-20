import { lazy, Suspense } from 'preact/compat';
import { StateUpdater } from 'preact/hooks';

// classes
import classes from './setting-dialog.module.scss';

// data
import { version } from '../../../package.json';
version as string;

// components
import ColorSelector from '../color-selector';
import Select from '../select';

const DialogExpanded = lazy(() => import('../dialog-expanded'));

// hooks
import useSettings from './use-setting';
import { useTranslation } from '../../i18n';

interface Props {
  state: boolean;
  setState: StateUpdater<boolean>;
}

const SettingDialog = (props: Props) => {
  const {t} = useTranslation('settings');
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
  const {
    lang, langs, setLang
  } = useTranslation('common');

  return (
    <Suspense fallback={null}>
      <DialogExpanded title="Settings" {...props}>
        <>
          {/* Language selector */}
          <div className="dialog-item">
            <div className="item-header">
              <h4 className="item-title">{t('lang')}</h4>
              <div className={classes.beta}>WIP</div>
            </div>
            <p className="item-description">
              {t('langDesc')}
            </p>
            <div className="item-actions">
              <Select
                marginLess
                defaultValue={lang}
                options={langs.map(lang => ({ name: lang.toUpperCase(), value: lang }))}
                onUpdate={(v) => setLang(v)}
              />
            </div>
          </div>
          {/* Colour scheme */}
          <div className="dialog-item">
            <div className="item-header">
              <h4 className="item-title">{t('colourScheme')}</h4>
            </div>
            <p className="item-description">
              {t('colourSchemeDesc')}
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
              <h4 className="item-title">{t('accentColour')}</h4>
            </div>
            <p className="item-description">
              {t('accentColourDesc')}
            </p>
            <div className="item-actions">
              <ColorSelector onSelect={setAccentColor} colors={accentColors} />
            </div>
          </div>
          {/* Disable blur */}
          <div className="dialog-item">
            <div className="item-header">
              <h4 className="item-title">{t('disableBlur')}</h4>
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
              {t('disableBlurDesc')}
            </p>
          </div>
          {/* Disable transform */}
          <div className="dialog-item">
            <div className="item-header">
              <h4 className="item-title">{t('disableAnimations')}</h4>
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
              {t('disableAnimationsDesc')}
            </p>
          </div>
          {/* Version */}
          <div className="dialog-item">
            <div className="item-header">
              <h4 className="item-title">{t('version')}</h4>
            </div>
            <p className="item-description">
              <span>{t('versionDesc')}</span>
              <span>{` "`}</span>
              <code>{version}</code>
              <span>{`"`}</span>
            </p>
          </div>
          {/* About */}
          <div className="dialog-item">
            <div className="item-header">
              <h4 className="item-title">{t('about')}</h4>
            </div>
            <p className="item-description">
              <p>{t('aboutDesc')}</p>
              <p>
                <a href='https://github.com/amir4rab/uni-os-lab' target='_blank' rel='noreferrer'>{`Source Code`}</a>
              </p>
            </p>
          </div>
        </>
      </DialogExpanded>
    </Suspense>
  );
};

export default SettingDialog;
