import { lazy, Suspense } from 'preact/compat';

import classes from './app.module.scss';

// components
import Footer from './components/footer';
import Header from './components/header';
import ProcessGuider from './components/process-guider';
import useVersionLogger from './hooks/use-version-logger';

// lazy components
const PwaUpdate = lazy(() => import('./components/pwa-update'));

export function App() {
  useVersionLogger();

  return (
    <main className={classes.main}>
      <Header />
      <div className={classes.contentBox}>
        <ProcessGuider />
      </div>
      <Suspense fallback={null}>
        <PwaUpdate />
      </Suspense>
      <Footer />
    </main>
  );
}
