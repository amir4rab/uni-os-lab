import { useEffect, useRef } from 'preact/hooks';
import classes from './loading-emulator.module.scss';

interface Props {
  onComplete: () => void;
}

const LoadingEmulator = ({ onComplete }: Props) => {
  const mounted = useRef(true);
  const progressRef = useRef<HTMLProgressElement | null>(null);

  useEffect(() => {
    if (progressRef.current) progressRef.current.value = 100;
    setTimeout(() => mounted.current && onComplete(), 1000);
    return () => {
      mounted.current = false;
    };
  }, []);

  return (
    <div className={classes.loadingEmulator}>
      <img src="/icons/chip.svg" placeholder="Loading" />
      <progress ref={progressRef} value={0} />
    </div>
  );
};

export default LoadingEmulator;
