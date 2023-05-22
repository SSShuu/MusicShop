import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/shared/auth/auth.service';
import { CheckOutService } from 'src/app/shared/check-out/check-out.service';
import { ShoppingService } from 'src/app/shared/shopping/shopping.service';
import { PaymentComponent } from '../../Dialogs/payment/payment.component';
@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css'],
})
export class CheckOutComponent implements OnInit, OnDestroy {
  subscription!: Subscription;
  minDate = new Date();
  maxDate = new Date(2022, 1, 1);
  checkoutForm!: FormGroup;
  constructor(
    public _FormBuilder: FormBuilder,
    public _Router: Router,
    public _ShoppingService: ShoppingService,
    public _CheckOutService: CheckOutService,
    public _AuthService: AuthService,
    public _Dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this._ShoppingService.showCheckoutHeader = true;
    this._ShoppingService.showRemoveItem = false;
    this._ShoppingService.showHeader = false;
    this._ShoppingService.showNavBar = false;
    this._AuthService.decode();
    this._ShoppingService.getCartItems(localStorage.getItem('cart'));
    this.checkoutForm = this._FormBuilder.group({
      first_name: new FormControl(this._AuthService.currentUser.first_name, [
        Validators.required,
      ]),
      last_name: new FormControl(this._AuthService.currentUser.last_name, [
        Validators.required,
      ]),

      email: new FormControl('', [Validators.required]),
      city: new FormControl('', [Validators.required]),
      company: new FormControl(''),
      shipping_street: new FormControl('', [Validators.required]),
      shipping_country: new FormControl('', [Validators.required]),
      phone_number: new FormControl('', [Validators.required]),
      shipping_date: new FormControl('', [Validators.required]),
    });
  }
  proceedToPayment() {
    this._Dialog.open(PaymentComponent, {
      data: {
        first_name: this.checkoutForm.value.first_name,
        last_name: this.checkoutForm.value.last_name,
        email: this.checkoutForm.value.email,
        city: this.checkoutForm.value.city,
        company: this.checkoutForm.value.company,
        shipping_street: this.checkoutForm.value.shipping_street,
        shipping_country: this.checkoutForm.value.shipping_country,
        phone_number: this.checkoutForm.value.phone_number,
        shipping_date: this.checkoutForm.value.shipping_date,
      },
    });
  }

  reloadCurrentRoute() {
    let currentUrl = this._Router.url;
    this._Router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this._Router.navigate([currentUrl]);
    });
  }
  ngOnDestroy() {
    if (this.subscription) this.subscription.unsubscribe();
  }
}
