import { provideFileRouter } from "@analogjs/router";
import { provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from "@angular/core";
import { bootstrapApplication } from "@angular/platform-browser";
import { withComponentInputBinding } from "@angular/router";
import Aura from "@primeuix/themes/aura";
import { providePrimeNG } from "primeng/config";
import { App } from "./app/app.component";

bootstrapApplication(App, {
  providers: [
    provideZonelessChangeDetection(),
    provideBrowserGlobalErrorListeners(),
    provideFileRouter(withComponentInputBinding()),
    providePrimeNG({
      theme: {
        preset: Aura,
        options: {
          darkModeSelector: "[data-theme=DARK]",
        },
      },
    }),
  ],
}).catch((err) => console.error(err));
