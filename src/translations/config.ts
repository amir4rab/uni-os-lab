import type { Config } from "../i18n";
import type { NameSpace } from "../types/name-space";

import enCommon from "./en/common.json";
enCommon as NameSpace;
import enAlgoSelector from "./en/algo-selector.json";
enAlgoSelector as NameSpace;

import faCommon from "./fa/common.json";
faCommon as NameSpace;
import faAlgoSelector from "./fa/algo-selector.json";
faAlgoSelector as NameSpace;

export default {
  lang: "en",
  langs: ["en", "fa"],
  ns: {
    en: {
      common: enCommon,
      algoSelector: enAlgoSelector
    },
    fa: {
      common: faCommon,
      algoSelector: faAlgoSelector
    }
  }
} as Config