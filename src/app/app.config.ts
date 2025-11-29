import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeuix/themes/aura';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import DndPreset from './dnd-preset';

export const appConfig: ApplicationConfig = {
  //@FIXME: primeng@21 not yet released with angular 21 support
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideAnimationsAsync(),
    providePrimeNG({
      theme: {
        preset: DndPreset,
        options: {
          // keep system dark mode (good for now)
          darkModeSelector: 'system',
          // make sure PrimeNG’s layer plays nice with Tailwind
          cssLayer: {
            name: 'primeng',
            order: 'app-styles, primeng, tailwind',
          },
        },
      },
    }),
  ],
};
