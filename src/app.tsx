import { useState } from 'preact/hooks';
import classes from './app.module.scss';

export function App() {
  const [count, setCount] = useState(0);

  return (
    <main className={classes.main}>
      <h1 className={classes.title}>CPU Timing system emulator</h1>
      <div></div>
    </main>
  );
}
