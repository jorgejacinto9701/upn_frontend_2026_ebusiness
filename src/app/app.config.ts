import { ApplicationConfig, importProvidersFrom ,provideBrowserGlobalErrorListeners, } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { MatInputModule } from "@angular/material/input"
import { MatDialogModule } from "@angular/material/dialog"
import { MatSelectModule } from "@angular/material/select"
import { MatRadioModule } from "@angular/material/radio"
import { MatCheckboxModule } from "@angular/material/checkbox"
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule} from '@angular/material/core';
import { MatCardModule } from '@angular/material/card';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { interceptorProvider } from './interceptors/prod-interceptor.service';


export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes), 
    provideHttpClient(withInterceptorsFromDi()),
    interceptorProvider,
    provideClientHydration(withEventReplay()),
    importProvidersFrom(MatInputModule),
    importProvidersFrom(MatDialogModule),
    importProvidersFrom(MatSelectModule),
    importProvidersFrom(MatRadioModule),
    importProvidersFrom(MatCheckboxModule),
    importProvidersFrom(MatToolbarModule),
    importProvidersFrom(MatGridListModule),
    importProvidersFrom(MatDatepickerModule),
    importProvidersFrom(MatNativeDateModule),
    importProvidersFrom(MatCardModule)

  ]
};
