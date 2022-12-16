import { useState, useEffect } from 'preact/hooks';

const useLocalStorage = <T,>(v: T, key: string) => {
  const [state, setState] = useState<T>(v);

  useEffect(() => {
    const localStorageValue = window.localStorage.getItem(key);

    if (localStorageValue === null) {
      window.localStorage.setItem(key, `${v}`);
    } else {
      switch (typeof v) {
        case 'number': {
          setState(parseFloat(localStorageValue) as T);
          break;
        }
        case 'boolean': {
          setState((localStorageValue === 'true') as T);
          break;
        }
        case 'string': {
          setState(localStorageValue as T);
          break;
        }
      }
    }
  }, []);

  const updateState = (v: T) => {
    setState(v);
    localStorage.setItem(key, `${v}`);
  };

  return [state, updateState] as const;
};

export default useLocalStorage;