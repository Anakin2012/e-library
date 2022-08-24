import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IdentityRoutingModule } from './identity-routing.module';
import { IdentityComponent } from './identity.component';
import { LoginFormComponent } from './feature-authentication/login-form/login-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RegisterFormComponent } from './feature-authorisation/register-form/register-form.component';
import { SettingsComponent } from './feature-settings/settings/settings.component';
import { LogoutComponent } from './feature-authentication/logout/logout.component';
import { AdminMembersComponent } from './feature-members/admin-members/admin-members.component';
import { RegisterAdminComponent } from './feature-members/register-admin/register-admin.component';
import { ManageMembershipsComponent } from './feature-members/manage-memberships/manage-memberships.component';


@NgModule({
  declarations: [
    IdentityComponent,
    LoginFormComponent,
    RegisterFormComponent,
    SettingsComponent,
    LogoutComponent,
    AdminMembersComponent,
    RegisterAdminComponent,
    ManageMembershipsComponent
  ],
  imports: [
    CommonModule,
    IdentityRoutingModule,
    ReactiveFormsModule
  ]
})
export class IdentityModule { }
