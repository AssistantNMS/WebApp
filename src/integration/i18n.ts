// import i18n from 'i18next';
// import { initReactI18next } from 'react-i18next';

// // import Backend from 'i18next-xhr-backend';
// // import LanguageDetector from 'i18next-browser-languagedetector';
// // not like to use this?
// // have a look at the Quick start guide 
// // for passing in lng and translations on init

// i18n
//   // load translation using xhr -> see /public/locales
//   // learn more: https://github.com/i18next/i18next-xhr-backend
//   // .use(Backend)
//   // detect user language
//   // learn more: https://github.com/i18next/i18next-browser-languageDetector
//   // .use(LanguageDetector)
//   // pass the i18n instance to react-i18next.
//   .use(initReactI18next)
//   // init i18next
//   // for all options read: https://www.i18next.com/overview/configuration-options
//   .init({
//     lng: 'en',
//     fallbackLng: 'en',
//     debug: true,

//     interpolation: {
//       escapeValue: false, // not needed for react as it escapes by default
//     }
//   });


// export default i18n;

import i18next from 'i18next';

export const initLocalization = (currentLanguage: string) => {
  i18next.init({
    lng: currentLanguage,
    fallbackLng: 'en',
    debug: true,

    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
    resources: loadLocaleMessages()
  });
}


function loadLocaleMessages(): any {
  const locales = require.context('../assets/lang', true, /[A-Za-z0-9-_,\s]+\.json$/i);
  const messages: any = {};
  locales.keys().forEach(key => {
    const matched = key.match(/language.([A-Za-z0-9-_]+)\./i);
    if (matched && matched.length > 1) {
      const locale = matched[1];
      let i18nextTranslationObject: any = { translation: {} };
      const currentLocaleObj = locales(key);
      for (var localeKey in currentLocaleObj) {
        i18nextTranslationObject.translation[localeKey] = currentLocaleObj[localeKey];
      }
      messages[locale] = i18nextTranslationObject;
    }
  })
  return messages
}