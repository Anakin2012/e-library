import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthorisationFacadeService } from '../../domain/application-services/authorisation-facade.service';


@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css']
})
export class RegisterFormComponent implements OnInit {
  public registerForm: FormGroup;

  constructor(private authorisationService: AuthorisationFacadeService) {
    this.registerForm = new FormGroup({
      name: new FormControl("", [Validators.required]),
      surname: new FormControl("", [Validators.required]),
      username: new FormControl("", [Validators.required]),
      email: new FormControl("", [Validators.required, Validators.email]),
      credentials: new FormControl("", [Validators.required]),
      password: new FormControl("", [Validators.required, Validators.minLength(8)]),
      membership: new FormControl("", [Validators.required])
    });
   }

  ngOnInit(): void {
  }

  public onRegisterFormSubmit() : void {
    if (this.registerForm.invalid) {
      window.alert('Form is invalid');
      return;
    }


    if(this.registerForm.value.membership === 'regular') {
      this.authorisationService.RegisterMember(this.registerForm.value.name, this.registerForm.value.surname, this.registerForm.value.username, this.registerForm.value.password, this.registerForm.value.email, parseFloat(this.registerForm.value.credentials)).subscribe((success: boolean) => {
        if(success==true) {
          window.alert('Account created successfuly!');
        }
        else {
          window.alert('Creation of the account failed!');
        }
        this.registerForm.reset();
      });
  }
  if(this.registerForm.value.membership === 'premium') {
    this.authorisationService.RegisterPremiumMember(this.registerForm.value.name, this.registerForm.value.surname, this.registerForm.value.username, this.registerForm.value.password, this.registerForm.value.email, parseFloat(this.registerForm.value.credentials)).subscribe((success: boolean) => {
      if(success==true) {
        window.alert('Account created successfuly!');
      }
      else {
        window.alert('Creation of the account failed!');
      }
      this.registerForm.reset();
    });
  }

  }

}
