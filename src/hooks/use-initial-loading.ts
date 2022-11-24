import { useEffect } from 'preact/hooks';

const useInitialLoading = () => {
  useEffect(() => {
    const el = document.getElementById('initial-loading-overlay');
    el?.setAttribute('data-loaded', 'true');
  }, []);
};

export default useInitialLoading;
