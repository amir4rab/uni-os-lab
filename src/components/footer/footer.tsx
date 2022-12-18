import { useState } from 'preact/hooks';
import classes from './footer.module.scss';

import { Suspense, lazy } from 'preact/compat';
import { useTranslation } from '../../i18n';

// lazy components
const MobileFab = lazy(() => import('../mobile-fab'));
const SettingDialog = lazy(() => import('../setting-dialog'));
const SettingsIcon = lazy(() => import('../icons/components/settings'));

const Content = ({ onClick }: { onClick: () => void }) => {
  const { t, lang } = useTranslation('footer');

  return (
    <div className={classes.inner}>
      <div className={classes.section}>
        <div className={classes.sectionItem}>
          <p className={classes.title}>{(0).toLocaleString(lang)}</p>
          <p className={classes.content}>
            {t('csa')}
          </p>
        </div>
        <div className={classes.sectionItem}>
          <p className={classes.title}>{(1).toLocaleString(lang)}</p>
          <p className={classes.content}>
            {t('ap')}
          </p>
        </div>
        <div className={classes.sectionItem}>
          <p className={classes.title}>{(2).toLocaleString(lang)}</p>
          <p className={classes.content}>
            {t('vr')}
          </p>
        </div>
      </div>
      <div className={classes.section}>
        <button onClick={onClick} className={classes.settingsButton}>
          <Suspense fallback={null}>
            <SettingsIcon className={classes.footerIcon} />
          </Suspense>
        </button>
      </div>
    </div>
  )
};

const Footer = () => {
  const [settingsState, setSettingsState] = useState(false);

  const toggleState = () => setSettingsState((curr) => !curr);

  return (
    <>
      <Suspense fallback={null}>
        <MobileFab
          icon={
            <Suspense fallback={null}>
              <SettingsIcon className={classes.fabIcon} />
            </Suspense>
          }
          onClick={toggleState}
        />
      </Suspense>
      <Suspense fallback={null}>
        <SettingDialog state={settingsState} setState={setSettingsState} />
      </Suspense>
      <footer className={classes.footer}>
        <Content onClick={toggleState} />
      </footer>
    </>
  );
};
export default Footer;
