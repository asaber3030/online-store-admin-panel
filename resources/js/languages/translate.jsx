import { DEFAULT_LANGUAGE, LANUGAGES } from "@/languages/languagesConfig";

import { EnglishWords } from "@/languages/english";
import { ArabicWords } from "@/languages/arabic";

import capitilize from "@/helpers/functions/capitilize";

export function translate(word) {

  if (localStorage.getItem('language') == 'english') {
    return EnglishWords[word] ?? capitilize(word)
  }

  else if (localStorage.getItem('language') == 'arabic') {
    return ArabicWords[word] ?? capitilize(word)
  }


}
