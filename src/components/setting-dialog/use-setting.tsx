import { useEffect, useMemo, useState } from 'preact/hooks';

interface AccentColor {
  name: string;
  hexCode: string;
}
interface ExportedAccentColor extends AccentColor {
  selected: boolean;
}
const accentColorsList: AccentColor[] = [
  {
    hexCode: '66d4cf',
    name: 'mint',
  },
  {
    hexCode: 'bf5af2',
    name: 'purple',
  },
  {
    hexCode: '64d2ff',
    name: 'cyan',
  },
  {
    hexCode: 'ff375f',
    name: 'pink',
  },
  {
    hexCode: '30d158',
    name: 'green',
  },
  {
    hexCode: 'ff453a',
    name: 'red',
  },
];

type ColorScheme = 'dark' | 'light';

interface UseSettings {
  colorScheme: ColorScheme;
  setColorScheme: (v: ColorScheme) => void;
  accentColors: ExportedAccentColor[];
  setAccentColor: (v: string) => void;
  disableBlur: boolean;
  setDisableBlur: (v: boolean) => void;
  disableTransform: boolean;
  setDisableTransform: (v: boolean) => void;
}

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

const useSettings: () => UseSettings = () => {
  const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>(
    'dark',
    'colorScheme',
  );
  const [accentColor, setAccentColor] = useLocalStorage<string>(
    accentColorsList[0].hexCode,
    'accentColor',
  );
  const [disableBlur, setDisableBlur] = useLocalStorage<boolean>(
    false,
    'disableBlur',
  );
  const [disableTransform, setDisableTransform] = useLocalStorage<boolean>(
    false,
    'disableTransform',
  );

  const updateHTMLAttributes = (attribute: string, value: string) => {
    try {
      const html = document.getElementsByTagName('html')[0] as HTMLHtmlElement;
      html.setAttribute(attribute, value);
    } catch (err) {
      console.error(err);
    }
  };

  const updateAccentColor = (hexCode: string) => {
    const accentColor = accentColorsList.find(
      ({ hexCode: code }) => hexCode === code,
    );
    if (accentColor === undefined) {
      console.error('Received an unsupported colour for accent colour!');
      return;
    }

    const { name } = accentColor;

    updateHTMLAttributes('data-accent-color', name);
    updateHTMLAttributes('theme-color', hexCode);
  };

  const accentColors: ExportedAccentColor[] = useMemo(
    () =>
      accentColorsList.map((data) => ({
        ...data,
        selected: data.hexCode === accentColor ? true : false,
      })),
    [accentColor],
  );

  useEffect(() => {
    updateHTMLAttributes('data-theme', colorScheme);
  }, [colorScheme]);

  useEffect(() => {
    updateAccentColor(accentColor);
  }, [accentColor]);

  useEffect(() => {
    updateHTMLAttributes('data-disable-blur', `${disableBlur}`);
  }, [disableBlur]);

  useEffect(() => {
    updateHTMLAttributes('data-disable-transform', `${disableTransform}`);
  }, [disableTransform]);

  return {
    colorScheme,
    setColorScheme,
    setAccentColor,
    setDisableBlur,
    setDisableTransform,
    accentColors,
    disableBlur,
    disableTransform,
  };
};

export default useSettings;
