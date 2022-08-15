import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css']
})
export class RegisterFormComponent implements OnInit {
  public registerForm: FormGroup;

  constructor() {
    this.registerForm = new FormGroup({
      name: new FormControl("", [Validators.required]),
      surname: new FormControl("", [Validators.required]),
      username: new FormControl("", [Validators.required]),
      password: new FormControl("", [Validators.required, Validators.minLength(8)]),
      email: new FormControl("", [Validators.required, Validators.email]),
      credentials: new FormControl("", [Validators.required])
    });
   }

  ngOnInit(): void {
  }

  public onRegisterFormSubmit() : void {
    // TODO
  }

}
