import type { Config } from "../i18n";
import type { NameSpace } from "../types/name-space";

import enCommon from "./en/common.json";
enCommon as NameSpace;

import faCommon from "./fa/common.json";
faCommon as NameSpace;

export default {
  lang: "en",
  langs: ["en", "fa"],
  ns: {
    en: {
      common: enCommon
    },
    fa: {
      common: faCommon
    }
  }
} as Config