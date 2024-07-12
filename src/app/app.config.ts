import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withHashLocation, withComponentInputBinding, withPreloading, PreloadAllModules } from '@angular/router';
import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { importProvidersFrom } from '@angular/core';
import { environment } from '../environments/environment';
import { FirebaseMockService } from './core/firebase/firebase.mock.service';
import { DATABASE_SERVICE } from './core/firebase/database.service';
import { BATCH_WRITE_SERVICE } from './core/store/batch-write.service';
import { BatchWriteMockService } from './core/store/batch-write.mock.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(
      routes,
      withHashLocation(),
      withComponentInputBinding(),
      withPreloading(PreloadAllModules),
    ),
    provideAnimationsAsync(),
    {
      provide: DATABASE_SERVICE,
      useClass: FirebaseMockService,
    },
    {
      provide: BATCH_WRITE_SERVICE,
      useClass: BatchWriteMockService,
    },
  ],
};
