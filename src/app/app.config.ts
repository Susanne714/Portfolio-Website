import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, HttpClient } from '@angular/common/http';
import { provideTranslateService, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { routes } from './app.routes';

/**
 * Factory function to create a TranslateHttpLoader.
 * This loader fetches translation files from the `assets/i18n/` directory.
 * @param http The HttpClient instance used to fetch translation files.
 * @returns A TranslateHttpLoader instance.
 */
export const httpLoaderFactory = (http: HttpClient) => {
  const path = './assets/i18n/';
  const suffix = '.json';
  return new TranslateHttpLoader(http, path, suffix);
};

/**
 * Application-wide configuration.
 * Provides necessary services like routing, HTTP client, and translation support.
 */
export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideHttpClient(),
    provideTranslateService({
      loader: {
        provide: TranslateLoader,
        useFactory: httpLoaderFactory,
        deps: [HttpClient],
      },
    }),
  ],
};