import classes from './mobile-fab.module.scss';

interface Props {
  icon: any;
  onClick: () => void;
}

const MobileFab = ({ icon, onClick }: Props) => (
  <>
    <button
      onClick={onClick}
      className={[classes.fabButton, 'primary'].join(' ')}
    >
      {icon}
    </button>
    <div aria-label="hidden" className={classes.fabSpacer} />
  </>
);

export default MobileFab;
