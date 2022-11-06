import { useEffect } from 'preact/hooks';
import { version } from '../../package.json';

const useVersionLogger = () => {
  useEffect(() => {
    console.log(`Currently running version ${version}`);
  }, []);
};

export default useVersionLogger;
