import { registerLocaleData } from '@angular/common';
import { HttpClientModule, provideHttpClient } from '@angular/common/http';
import en from '@angular/common/locales/en';
import { importProvidersFrom } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideRouter, Routes } from '@angular/router';
import { en_US, provideNzI18n } from 'ng-zorro-antd/i18n';
import { provideNzIcons } from 'ng-zorro-antd/icon';
import { AppComponent } from './app/app.component';
import { BoardingsComponent } from './app/pages/boardings/boardings.component';
import { icons } from './app/icons-provider';
import { DashboardComponent } from './app/pages/dashboard/dashboard.component';
import { routes } from './app/app.routes';

registerLocaleData(en);



bootstrapApplication(AppComponent, {
  providers: [importProvidersFrom(HttpClientModule), provideRouter(routes), provideNzIcons(icons), provideNzI18n(en_US), importProvidersFrom(FormsModule), provideAnimationsAsync(), provideHttpClient()],
});
