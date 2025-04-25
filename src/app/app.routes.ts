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
import { SignupFormComponent } from './pages/signup-form/signup-form.component';
import { FormArrayComponent } from './components/form-array/form-array.component';
import { LoginFormComponent } from './pages/login-form/login-form.component';


export const routes: Routes = [
  { path: "", redirectTo: "/dashboard", pathMatch: "full" },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'boardings', component: BoardingsComponent },
  { path: 'boarding-types', component: BoardingTypeComponent},
  { path: 'bus-stops', component: BusStopComponent },
  { path: 'lines', component: LinesComponent },
  { path: 'directions', component: DirectionsComponent },
  { path: 'routes', component: RoutesComponent },
  { path: 'departure-days', component: DepartureDaysComponent },
  { path: 'departures', component: DeparturesComponent },
  { path: 'points', component: PointsComponent },
  { path: 'signup', component: SignupFormComponent },
  { path: 'form-array', component: FormArrayComponent },
  { path: 'app-login-form', component: LoginFormComponent},    
];
