import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./components/login/login.component";
import {HomeComponent} from "./pages/home/home.component";
import {RoutePaths} from "../RoutePaths";
import {PageNotFoundComponent} from "./pages/page-not-found/page-not-found.component";
import {RegisterComponent} from "./components/register/register.component";
import {DashboardComponent} from "./pages/dashboard/dashboard.component";
import {AccessGuard} from "./guards/access.guard";

const routes: Routes = [
  {
    path: RoutePaths.home,
    component: HomeComponent
  },
  {
    path: RoutePaths.login,
    component: LoginComponent
  },
  {
    path: RoutePaths.register,
    component: RegisterComponent
  },
  {
    path: RoutePaths.dashboard,
    component: DashboardComponent,
    canActivate: [AccessGuard]
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
