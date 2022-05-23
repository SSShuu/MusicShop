import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { CheckOutService } from 'src/app/shared/check-out/check-out.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ShoppingService } from 'src/app/shared/shopping/shopping.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css'],
})
export class PaymentComponent implements OnInit, OnDestroy {
  numericNumberReg = '^-?[0-9]\\d*(\\.\\d{1,2})?$';
  subscription!: Subscription;
  paymentForm!: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public _Data: any,
    public _CheckoutService: CheckOutService,
    public _Router: Router,
    public _FormBuilder: FormBuilder,
    public _ShoppingService: ShoppingService
  ) {}

  ngOnInit(): void {
    this.paymentForm = this._FormBuilder.group({
      creditCard: [
        '',
        [Validators.minLength(12), Validators.pattern(this.numericNumberReg)],
      ],
      expiration_date: [''],
      credit_card_verification: new FormControl('', [Validators.minLength(3)]),
    });
  }
  paymentSubmitHandler() {
    this._CheckoutService.paymentSubmit({
      cart: localStorage.getItem('cart'),
      email: this._Data.email,
      first_name: this._Data.first_name,
      last_name: this._Data.last_name,
      company: this._Data.company,
      total_price: this._ShoppingService.totalPrice,
      shipping_street: this._Data.shipping_street,
      shipping_country: this._Data.shipping_country,
      post_code: this._Data.post_code,
      phone_number: this._Data.phone_number,
      credit_card: this.paymentForm.value.card_number,
      credit_expiration_date: this.paymentForm.value.expiration_date,
      credit_card_verification: this.paymentForm.value.credit_card_verification,
    });
    this._ShoppingService.resetCart(localStorage.getItem('cart'));
    this._Router.navigateByUrl('confirmation');
  }

  ngOnDestroy() {
    if (this.subscription) this.subscription.unsubscribe();
  }
}
