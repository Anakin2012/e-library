import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthorisationFacadeService } from '../../domain/application-services/authorisation-facade.service';
import { PasswordValidator } from '../../validators/password-validator/password-validator';


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
      password: new FormControl("", [Validators.required, Validators.minLength(8), PasswordValidator.strongPassword]),
      membership: new FormControl("", [Validators.required])
    });
   }

  ngOnInit(): void {
  }

  public onRegisterFormSubmit() : void {
    if(this.registerForm.controls['password'].invalid) {
      window.alert('Invalid password! Password must contain at least 8 characters and must have at least one number, one lowercase and one uppercase letter!');
      return;
    }

    if(this.registerForm.controls['email'].invalid) {
      window.alert('Invalid email address!');
      return;
    }

    if(this.registerForm.controls['name'].invalid) {
      window.alert('Name required!');
      return;
    }
    

    if(this.registerForm.controls['surname'].invalid) {
      window.alert('Surname required!');
      return;
    }

    if(this.registerForm.controls['username'].invalid) {
      window.alert('Username required!');
      return;
    }

    if(this.registerForm.controls['membership'].invalid) {
      window.alert('You need to choose membership!');
      return;
    }
    

    if(this.registerForm.value.membership === 'regular') {
      this.authorisationService.RegisterMember(this.registerForm.value.name, this.registerForm.value.surname, this.registerForm.value.username, this.registerForm.value.password, this.registerForm.value.email).subscribe((success: boolean) => {
        if(success==true) {
          window.alert('Account created successfully!');
        }
        else {
          window.alert('Creation of the account failed! Username or email already taken!');
        }
        this.registerForm.reset();
      });
  }
  if(this.registerForm.value.membership === 'premium') {
    this.authorisationService.RegisterPremiumMember(this.registerForm.value.name, this.registerForm.value.surname, this.registerForm.value.username, this.registerForm.value.password, this.registerForm.value.email).subscribe((success: boolean) => {
      if(success==true) {
        window.alert('Account created successfully!');
      }
      else {
        window.alert('Creation of the account failed! Username or email already taken!');
      }
      this.registerForm.reset();
    });
  }

  }

}
