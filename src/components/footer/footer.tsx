import { useState } from 'preact/hooks';
import classes from './footer.module.scss';

import { Suspense, lazy } from 'preact/compat';

// lazy components
const MobileFab = lazy(() => import('../mobile-fab'));
const SettingDialog = lazy(() => import('../setting-dialog'));
const SettingsIcon = lazy(() => import('../icons/components/settings'));

const Content = ({ onClick }: { onClick: () => void }) => (
  <div className={classes.inner}>
    <div className={classes.section}>
      <div className={classes.sectionItem}>
        <p className={classes.title}>0</p>
        <p className={classes.content}>
          Chose <br /> Scheduler <br /> Algorithm
        </p>
      </div>
      <div className={classes.sectionItem}>
        <p className={classes.title}>1</p>
        <p className={classes.content}>
          Add <br /> Processes
        </p>
      </div>
      <div className={classes.sectionItem}>
        <p className={classes.title}>2</p>
        <p className={classes.content}>
          Visit <br /> results
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
);

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
