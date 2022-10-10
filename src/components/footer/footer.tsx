import classes from './footer.module.scss';

const Footer = () => {
  return (
    <footer className={classes.footer}>
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
          <p>
            <span>Visit Websites's code on</span>
            <a
              href="https://github.com/amir4rab/uni-os-lab"
              target="_"
              rel="noreferrer"
            >
              Github
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
