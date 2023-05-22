import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/shared/auth/auth.service';
import { ShoppingService } from 'src/app/shared/shopping/shopping.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent implements OnInit, OnDestroy {
  subscription!: Subscription;
  signUpForm!: FormGroup;
  constructor(
    public _FormBuilder: FormBuilder,
    public _Router: Router,
    public _AuthServics: AuthService,
    public _ShoppingService: ShoppingService
  ) {}

  ngOnInit(): void {
    this.signUpForm = this._FormBuilder.group({
      first_name: new FormControl('', Validators.required),
      last_name: new FormControl('', Validators.required),
      email: new FormControl('', Validators.email),
      password: new FormControl('', Validators.required),
      confirmPassword: new FormControl('', Validators.required),
    });
  }
  signUpHandler() {
    this._AuthServics.signUp(this.signUpForm.value);
  }
  ngOnDestroy() {
    if (this.subscription) this.subscription.unsubscribe();
  }
}
