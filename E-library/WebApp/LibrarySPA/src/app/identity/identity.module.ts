import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IdentityRoutingModule } from './identity-routing.module';
import { IdentityComponent } from './identity.component';
import { LoginFormComponent } from './feature-authentication/login-form/login-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RegisterFormComponent } from './feature-authorisation/register-form/register-form.component';
import { SettingsComponent } from './feature-settings/settings/settings.component';


@NgModule({
  declarations: [
    IdentityComponent,
    LoginFormComponent,
    RegisterFormComponent,
    SettingsComponent
  ],
  imports: [
    CommonModule,
    IdentityRoutingModule,
    ReactiveFormsModule
  ]
})
export class IdentityModule { }
