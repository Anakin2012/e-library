import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotAuthenticatedGuard } from '../shared/guards/not-authenticated.guard';
import { LoginFormComponent } from './feature-authentication/login-form/login-form.component';
import { LogoutComponent } from './feature-authentication/logout/logout.component';
import { RegisterFormComponent } from './feature-authorisation/register-form/register-form.component';
import { AdminMembersComponent } from './feature-members/admin-members/admin-members.component';
import { ManageMembershipsComponent } from './feature-members/manage-memberships/manage-memberships.component';
import { RegisterAdminComponent } from './feature-members/register-admin/register-admin.component';
import { SettingsComponent } from './feature-settings/settings/settings.component';
import { IdentityComponent } from './identity.component';

const routes: Routes = [
  { path: '', component: IdentityComponent},
  { path: 'login', component: LoginFormComponent},
  { path: 'register', component: RegisterFormComponent},
  { path: 'account', component: SettingsComponent, canActivate : [NotAuthenticatedGuard]},
  { path: 'logout', component: LogoutComponent, canActivate : [NotAuthenticatedGuard]},
  { path: 'admin', component: AdminMembersComponent, canActivate : [NotAuthenticatedGuard]},
  { path: 'admin/register-administrator', component: RegisterAdminComponent, canActivate : [NotAuthenticatedGuard]},
  { path: 'admin/manage-memberships', component: ManageMembershipsComponent, canActivate : [NotAuthenticatedGuard]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IdentityRoutingModule { }
