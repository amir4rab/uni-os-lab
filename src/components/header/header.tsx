import classes from './header.module.scss';

const MobileHeader = () => {
  return (
    <div className={classes.header}>
      <h1 className={classes.title}>
        <span>CPU</span>
        <span>Scheduler</span>
        <span>Emulator</span>
      </h1>
    </div>
  );
};

export default MobileHeader;