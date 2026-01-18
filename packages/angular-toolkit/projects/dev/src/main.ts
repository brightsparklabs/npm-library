import { bootstrapApplication } from '@angular/platform-browser';
import { App } from './app/app';
import {
  provideBrowserGlobalErrorListeners,
  provideZonelessChangeDetection,
} from '@angular/core';
import { provideFileRouter } from '@analogjs/router';
import { withComponentInputBinding } from '@angular/router';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeuix/themes/aura';

bootstrapApplication(App, {
  providers: [
    provideZonelessChangeDetection(),
    provideBrowserGlobalErrorListeners(),
    provideFileRouter(withComponentInputBinding()),
    providePrimeNG({
      theme: {
        preset: Aura,
        options: {
          darkModeSelector: '[data-theme=DARK]',
        },
      },
    }),
  ],
}).catch((err) => console.error(err));
