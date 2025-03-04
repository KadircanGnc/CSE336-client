import { Routes } from '@angular/router';
import { BoardingsComponent } from './pages/boardings/boardings.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';

export const routes: Routes = [
  { path: "", redirectTo: "/dashboard", pathMatch: "full" },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'boardings', component: BoardingsComponent },
];
