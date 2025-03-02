import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter, Routes } from '@angular/router';
import { importProvidersFrom } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app/app.component';
import { BoardingsComponent } from './app/components/boardings/boardings.component';

const routes: Routes = [
  { path: '', redirectTo: '/boardings', pathMatch: 'full' },
  { path: 'boardings', component: BoardingsComponent },
];

bootstrapApplication(AppComponent, {
  providers: [importProvidersFrom(HttpClientModule), provideRouter(routes)],
});
