import { ComponentChildren } from 'preact';
import { useState } from 'preact/hooks';
import Dialog from '../dialog';
import classes from './mobile-fab.module.scss';

interface Props {
  title: string;
  icon: string;
  children: ComponentChildren;
}

const MobileFab = ({ icon, title, children }: Props) => {
  const [displayed, setDisplayed] = useState(false);

  return (
    <>
      <button
        onClick={() => setDisplayed((curr) => !curr)}
        className={[classes.fabButton, 'primary'].join(' ')}
      >
        {icon}
      </button>
      <Dialog title={title} state={displayed} setState={setDisplayed}>
        {children}
      </Dialog>
      <div aria-label="hidden" className={classes.fabSpacer} />
    </>
  );
};

export default MobileFab;
