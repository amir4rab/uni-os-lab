import type { NameSpaces } from '../types/name-space';
import type { ComponentChildren } from 'preact';

import { createContext } from 'preact';
import { useEffect, useState } from 'preact/hooks';
import useLocalStorage from '../hooks/use-local-storage';

interface ContextValue {
  lang: string;
  langs: string[];
  nameSpaces: NameSpaces;
  setLang: (lang: string) => void;
  dir: 'ltr' | 'rtl';
};

const defaultValue: ContextValue = {
  lang: 'en',
  langs: ['en'],
  nameSpaces: {},
  setLang: () => {},
  dir: 'ltr'
}

export interface Config {
  lang: string;
  langs: string[];
  ns: {
    [lang: string]: NameSpaces
  };
}

export const TranslationContext = createContext<ContextValue>(defaultValue);

interface ProviderProps {
  children: ComponentChildren, 
  config: Config
}

/** Provides Translation capabilities for web-application */
export const TranslationProvider = ({ children, config:{ lang: defaultLang, langs, ns }}: ProviderProps) => {
  const [ lang, setLang ] = useLocalStorage(defaultLang, 'lang');
  const [ dir, setDir ] = useState<ContextValue['dir']>('ltr');
  const [ nameSpaces, setNameSpaces ] = useState(ns[lang]);

  /** Updates web-applications language */
  const onSetLang = (lang: string) => {
    // Checking if the language is supported
    if ( !langs.includes(lang) ) {
      console.error(`Langs array doesn't include ${lang}`)
      return;
    }

    
    // Setting state hooks
    setLang(lang);
  }
  
  // Updating on language changes
  useEffect(() => {
    const dir = lang === 'fa' ? 'rtl' : 'ltr';

    setNameSpaces(ns[lang])
    setDir(dir);

    // Updating html attributes
    const html =  document.getElementsByTagName('html')[0] as HTMLHtmlElement;
    html.setAttribute('dir', dir);
    html.setAttribute('lang', lang);
  }, [lang])

  return (
    <TranslationContext.Provider
      value={{
        lang,
        dir,
        langs,
        nameSpaces,
        setLang: onSetLang
      }}
    >
      { children }
    </TranslationContext.Provider>
  )
};