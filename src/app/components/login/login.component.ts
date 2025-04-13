import { Component } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {NgIf} from '@angular/common';
import {Store} from '@ngrx/store';
import {UserActions} from '../../store/user/user.actions';
import {MatError, MatFormField, MatInput, MatLabel} from '@angular/material/input';
import {MatButton} from '@angular/material/button';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [
    ReactiveFormsModule,
    NgIf,
    MatFormField,
    MatLabel,
    MatInput,
    MatError,
    MatButton
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private readonly store: Store,
    private readonly router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const userData = this.loginForm.value;
      this.store.dispatch(UserActions.userLogin({
        email: userData.email,
        password: userData.password
      }));
      this.router
    } else {
      console.log('Form is invalid');
    }
  }
}
