import type { Config } from "../i18n";
import type { NameSpace } from "../types/name-space";

interface Module {
  default: NameSpace
}

/** Parses inputs to json */
const parseModules = (input: Record<string, unknown>, path: string) => {
  const result: { [key: string]: NameSpace} = {};
  
  Object.keys(input).forEach(key => {

    // Extracting modules
    const { default: nameSpace } = input[key] as Module;

    // Removing path and .json file format from the key
    const title = key.slice(path.length, ('.json'.length * -1));

    // Appending files to the namespace
    result[title] = nameSpace;
  })

  return result;
}

/** Parses inputs to json */
const parseAsyncModules = async (input: Record<string, unknown>, path: string) => {
  const result: { [key: string]: NameSpace} = {};
  
  const keys = Object.keys(input);


  const dataArray: Module[] = await Promise.all(
    keys.map(k => (input[k] as () => Promise<Module>)())
  )

  dataArray.map((data, index) => {
    // Extracting modules
    const { default: nameSpace } = data;

    // Removing path and .json file format from the key
    const title = keys[index].slice(path.length, ('.json'.length * -1));

    // Appending files to the namespace
    result[title] = nameSpace;
  })

  console.log(dataArray)
  return result;
}

const enModules = import.meta.glob('./en/*.json', { eager: true });
const faModules = import.meta.glob('./fa/*.json', { eager: true });

export default {
  lang: "en",
  langs: ["en", "fa"],
  ns: {
    en: parseModules(enModules, './en/'),
    fa: parseModules(faModules, './fa/')
  }
} as Config