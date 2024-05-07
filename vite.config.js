// vite.config.js
import {resolve} from 'path';
import {defineConfig} from 'vite';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        // List your html files here, e.g:
        main: resolve(dirname, 'login.html'),
        home: resolve(dirname, 'home.html'),
        diary: resolve(dirname, 'päiväkirjamerkintä/päiväkirjamerkintä.html'),
        profile: resolve(dirname, 'profiili/profiili.html'),
        history: resolve(dirname, 'historia/historia.html'),
        mood: resolve(dirname, 'mieliala/mieliala.html'),
        hrv: resolve(dirname, 'hrv-kubios.html'),
        diaryhistory: resolve(dirname, 'paivakirjamerkinta.html'),
        selectdiary: resolve(dirname, 'vanhat_merkinnat.html'),
      },
    },
  },
  // Public base path could be set here too:
  base: '/~vernerss/vite-terveyssovellus/',
});