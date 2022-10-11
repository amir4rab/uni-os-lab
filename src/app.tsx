import classes from './app.module.scss';
import Footer from './components/footer';
import ProcessGuider from './components/process-guider';

export function App() {
  return (
    <main className={classes.main}>
      <div className={classes.hero}>
        <h1 className={classes.title}>
          <span>CPU</span>
          <span>Scheduler</span>
          <span>Emulator</span>
        </h1>
      </div>
      <div className={classes.contentBox}>
        <ProcessGuider />
      </div>
      <Footer />
    </main>
  );
}
