import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {
  public loginForm: FormGroup;

  constructor() { 
    this.loginForm = new FormGroup({
      loginName: new FormControl("", [Validators.required]),
      password: new FormControl("", [Validators.required, Validators.minLength(8)])
    });
  }

  ngOnInit(): void {
  }

  public onLoginFormSubmit() : void {
    // TODO
  }

}
