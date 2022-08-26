import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationFacadeService } from '../../domain/application-services/authentication-facade.service';
import { PasswordValidator } from '../../validators/password-validator/password-validator';


interface ILoginFormData {
  loginName: string;
  password: string;
}

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {
  public loginForm: FormGroup;

  constructor(private authenticationService: AuthenticationFacadeService, private routerService : Router) { 
    this.loginForm = new FormGroup({
      loginName: new FormControl("", [Validators.required]),
      password: new FormControl("", [Validators.required, Validators.minLength(8), PasswordValidator.strongPassword])
    });
  }

  ngOnInit(): void {
  }

  public onLoginFormSubmit() : void {
    if(this.loginForm.invalid) {
      window.alert('Invalid form!');
      return;
    }

    const data : ILoginFormData = this.loginForm.value as ILoginFormData;

    this.authenticationService.Login(data.loginName, data.password).subscribe((success: boolean) => {
      if(success==true) {
        window.alert('Login is successfull!');
      }
      else {
        window.alert('Login is not successfull!');
      }
      this.loginForm.reset();
      if(success == true) {
        this.routerService.navigate(['/Home']);
      }
    });

  }

}
