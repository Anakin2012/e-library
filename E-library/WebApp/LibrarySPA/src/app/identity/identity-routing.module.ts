import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotAuthenticatedGuard } from '../shared/guards/not-authenticated.guard';
import { LoginFormComponent } from './feature-authentication/login-form/login-form.component';
import { LogoutComponent } from './feature-authentication/logout/logout.component';
import { RegisterFormComponent } from './feature-authorisation/register-form/register-form.component';
import { SettingsComponent } from './feature-settings/settings/settings.component';
import { IdentityComponent } from './identity.component';

const routes: Routes = [
  { path: '', component: IdentityComponent},
  { path: 'login', component: LoginFormComponent},
  { path: 'register', component: RegisterFormComponent},
  { path: 'settings', component: SettingsComponent},
  { path: 'logout', component: LogoutComponent, canActivate : [NotAuthenticatedGuard]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IdentityRoutingModule { }
