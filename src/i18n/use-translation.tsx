import { useContext } from 'preact/hooks';
import { TranslationContext } from './provider';

export const useTranslation = (nameSpace: string) => {
  const { lang, langs, nameSpaces, setLang, dir } = useContext(TranslationContext);

  const t = (key: string) => nameSpaces[nameSpace][key];

  return ({
    lang, langs, setLang, t, dir
  });
}