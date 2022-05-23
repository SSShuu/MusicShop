import { Component, OnDestroy, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/auth/auth.service';
import { CheckOutService } from 'src/app/shared/check-out/check-out.service';
import { ShoppingService } from 'src/app/shared/shopping/shopping.service';
@Component({
  selector: 'app-thank-you',
  templateUrl: './thank-you.component.html',
  styleUrls: ['./thank-you.component.css'],
})
export class ThankYouComponent implements OnInit, OnDestroy {
  constructor(
    public _Router: Router,
    public _ShoppingService: ShoppingService,
    public _CheckOutService: CheckOutService,
    public _AuthService: AuthService
  ) {}

  ngOnInit(): void {
    this._CheckOutService.enableChekout = false;
    this._AuthService.clearUser();
    this._ShoppingService.showHeader = false;
    this._ShoppingService.showNavBar = false;
    this._ShoppingService.showFooter = false;
  }

  backToHomePage() {
    this._ShoppingService.showHeader = true;
    this._Router.navigateByUrl('');
  }
  ngOnDestroy() {
    this._ShoppingService.showHeader = true;
    this._ShoppingService.showNavBar = true;
    this._ShoppingService.showFooter = true;
    this._ShoppingService.showCheckoutHeader = false;
    this._CheckOutService.enableChekout = true;
  }
}
