import { Component } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {NgIf} from '@angular/common';
import {MatError, MatFormField, MatInput, MatLabel} from '@angular/material/input';
import {MatButton} from '@angular/material/button';
import {Store} from '@ngrx/store';
import {ProductActions} from '../../store/product/product.actions';
import {User} from '../../interfaces/user';

@Component({
  selector: 'app-nap-kozbeni-arufelvet',
  imports: [
    ReactiveFormsModule,
    NgIf,
    MatFormField,
    MatInput,
    MatButton,
    MatLabel,
    MatError
  ],
  templateUrl: './nap-kozbeni-arufelvet.component.html',
  styleUrl: './nap-kozbeni-arufelvet.component.css'
})
export class NapKozbeniArufelvetComponent {
  productForm: FormGroup;
  user = JSON.parse(localStorage.getItem('user') ?? '') as User;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private store: Store
  ) {
    this.productForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      price: ['', [Validators.required, Validators.min(0)]],
      image: ['', [Validators.required]]
    });
  }

  onSubmit() {
    if (this.productForm.valid) {
      const product = {
        ...this.productForm.value,
        selected: false
      };
      this.store.dispatch(ProductActions.productCreate({ product: {
          name: product.name,
          price: product.price,
          image: product.image,
          userEmail: this.user.email
        }
      }));
      this.router.navigate(['/']);
    }
  }
}
