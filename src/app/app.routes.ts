import { Routes } from '@angular/router';
import { BoardingsComponent } from './pages/boardings/boardings.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { BoardingTypeComponent } from './pages/boarding-type/boarding-type.component';
import { BusStopComponent } from './pages/bus-stop/bus-stop.component';

export const routes: Routes = [
  { path: "", redirectTo: "/dashboard", pathMatch: "full" },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'boardings', component: BoardingsComponent },
  { path: 'boarding-types', component: BoardingTypeComponent},
  { path: 'bus-stops', component: BusStopComponent }
];
