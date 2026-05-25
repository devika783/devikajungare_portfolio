import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        caseStudy: resolve(__dirname, 'case-study.html'),
        caseStudySoundaware: resolve(__dirname, 'case-study-soundaware.html'),
        caseStudyBeyondWords: resolve(__dirname, 'case-study-beyond-words.html'),
        caseStudyJanAushadhi: resolve(__dirname, 'case-study-jan-aushadhi.html'),
        caseStudyMetroAccessibility: resolve(__dirname, 'case-study-metro-accessibility.html'),
        caseStudyRemnants: resolve(__dirname, 'case-study-remnants.html'),
      },
    },
  },
});
