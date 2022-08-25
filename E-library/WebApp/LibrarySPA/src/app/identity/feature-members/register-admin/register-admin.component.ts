import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { IAppState } from 'src/app/shared/app-state/app-state';
import { AppStateService } from 'src/app/shared/app-state/app-state.service';
import { AdminFacadeService } from '../../domain/application-services/admin-facade.service';

@Component({
  selector: 'app-register-admin',
  templateUrl: './register-admin.component.html',
  styleUrls: ['./register-admin.component.css']
})
export class RegisterAdminComponent implements OnInit {
  public appState$: Observable<IAppState>;
  public registerForm: FormGroup;

  constructor(private appStateService: AppStateService, private adminService : AdminFacadeService) {
    this.appState$ = this.appStateService.getAppState();
    this.registerForm = new FormGroup({
      name: new FormControl("", [Validators.required]),
      surname: new FormControl("", [Validators.required]),
      username: new FormControl("", [Validators.required]),
      email: new FormControl("", [Validators.required, Validators.email]),
      password: new FormControl("", [Validators.required, Validators.minLength(8)])
    });
   }

  ngOnInit(): void {
  }

  public RegisterAdministrator() : void {
    if (this.registerForm.invalid) {
      window.alert('Form is invalid');
      return;
    }

    this.adminService.RegisterAdministrator(this.registerForm.value.name, this.registerForm.value.surname, this.registerForm.value.username, this.registerForm.value.password, this.registerForm.value.email).subscribe((success : boolean) => {
      if(success==true) {
        window.alert('New admin account created!');
      }
      else {
        window.alert('Creation of the account failed!');
      }
      this.registerForm.reset();
    });



  }

}