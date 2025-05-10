import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './App.css';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import enTranslation from './i18n/en.json';
import nlTranslation from './i18n/nl.json';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: enTranslation },
      nl: { translation: nlTranslation },
    },
    fallbackLng: 'en',
    interpolation: { escapeValue: false },
  });

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
