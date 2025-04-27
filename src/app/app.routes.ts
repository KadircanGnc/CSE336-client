import { Routes } from '@angular/router';
import { BoardingsComponent } from './pages/boardings/boardings.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { BoardingTypeComponent } from './pages/boarding-type/boarding-type.component';
import { BusStopComponent } from './pages/bus-stop/bus-stop.component';
import { LinesComponent } from './pages/lines/lines.component';
import { DirectionsComponent } from './pages/directions/directions.component';
import { RoutesComponent } from './pages/routes/routes.component';
import { DepartureDaysComponent } from './pages/departure-days/departure-days.component';
import { DeparturesComponent } from './pages/departures/departures.component';
import { PointsComponent } from './pages/points/points.component';
import { FormArrayComponent } from './components/form-array/form-array.component';
import { LoginFormComponent } from './pages/login-form/login-form.component';
import { AuthGuard } from './utils/auth.guard';


export const routes: Routes = [
  { path: "", redirectTo: "/dashboard", pathMatch: "full" },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'boardings', component: BoardingsComponent, canActivate: [AuthGuard] },
  { path: 'boarding-types', component: BoardingTypeComponent, canActivate: [AuthGuard] },
  { path: 'bus-stops', component: BusStopComponent, canActivate: [AuthGuard] },
  { path: 'lines', component: LinesComponent, canActivate: [AuthGuard] },
  { path: 'directions', component: DirectionsComponent, canActivate: [AuthGuard] },
  { path: 'routes', component: RoutesComponent, canActivate: [AuthGuard] },
  { path: 'departure-days', component: DepartureDaysComponent, canActivate: [AuthGuard] },
  { path: 'departures', component: DeparturesComponent, canActivate: [AuthGuard] },
  { path: 'points', component: PointsComponent, canActivate: [AuthGuard] },  
  { path: 'form-array', component: FormArrayComponent, canActivate: [AuthGuard] },
  { path: 'app-login-form', component: LoginFormComponent},    
];
