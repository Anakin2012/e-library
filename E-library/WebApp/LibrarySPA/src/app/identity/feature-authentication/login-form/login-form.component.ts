import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthenticationFacadeService } from '../../domain/application-services/authentication-facade.service';


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

  constructor(private authenticationService: AuthenticationFacadeService) { 
    this.loginForm = new FormGroup({
      loginName: new FormControl("", [Validators.required]),
      password: new FormControl("", [Validators.required, Validators.minLength(8)])
    });
  }

  ngOnInit(): void {
  }

  public onLoginFormSubmit() : void {
    if (this.loginForm.invalid) {
      window.alert('Form is invalid');
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
    });

  }

}
