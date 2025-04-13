import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {NgIf} from '@angular/common';
import {Store} from '@ngrx/store';
import {UserActions} from '../../store/user/user.actions';
import {MatError, MatFormField, MatInput, MatLabel} from '@angular/material/input';
import {MatButton} from '@angular/material/button';

@Component({
  selector: 'app-register',
  imports: [
    NgIf,
    ReactiveFormsModule,
    MatLabel,
    MatFormField,
    MatError,
    MatInput,
    MatButton
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private store: Store
  ) {
    this.registerForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(4)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6)]],
    }, { validators: this.passwordMatchValidator });
  }

  ngOnInit(): void {}

  passwordMatchValidator(form: FormGroup): any {
    const password = form.get('password')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;
    if (password !== confirmPassword) {
      form.get('confirmPassword')?.setErrors({ mismatch: true });
    } else {
      return null;
    }
  }

  onSubmit() {
    if (this.registerForm.valid) {
      const user = this.registerForm.value;
      this.store.dispatch(UserActions.userRegister({
        username: user.username,
        email: user.email,
        password: user.password
      }));
    } else {
      console.log('Form is invalid');
    }
  }
}
