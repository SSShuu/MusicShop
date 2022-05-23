import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/shared/auth/auth.service';
import { ShoppingService } from 'src/app/shared/shopping/shopping.service';
@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css'],
})
export class SignInComponent implements OnInit, OnDestroy {
  subscription!: Subscription;
  signInForm!: FormGroup;
  constructor(
    public _FormBuilder: FormBuilder,
    public _Router: Router,
    public _AuthServics: AuthService,
    public _ShoppingService: ShoppingService
  ) {}

  ngOnInit(): void {
    this.signInForm = this._FormBuilder.group({
      email: new FormControl('', Validators.email),
      password: new FormControl('', Validators.required),
    });
  }
  logInHandler() {
    this._AuthServics.login(this.signInForm.value);
  }
  ngOnDestroy() {
    if (this.subscription) this.subscription.unsubscribe();
  }
}
