import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './service/auth/auth-guard.service';

import { LoginComponent } from './login/login.component';
import { MainComponent } from './main/main.component';



const routes: Routes = [
  { path: '', redirectTo: 'main', canActivate: [AuthGuard], pathMatch: 'full'}, // canActivate, AuthGuardService
  { path: 'login', component: LoginComponent },
  { path: 'main', canActivate: [AuthGuard], component: MainComponent},
  { path: '**', redirectTo: 'main', canActivate: [AuthGuard]}, // canActivate, AuthGuardService
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
