import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/shared/auth/auth.service';
import { ShoppingService } from 'src/app/shared/shopping/shopping.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})
export class MainComponent implements OnInit, OnDestroy {
  subscription!: Subscription;
  firstNewsDate: any = new Date();
  secondNewsDate: any = new Date();
  thirdNewsDate: any = new Date();
  constructor(
    public _ShoppingService: ShoppingService,
    public _AuthService: AuthService
  ) {}

  ngOnInit(): void {
    this.firstNewsDate = this.firstNewsDate.setDate(
      this.firstNewsDate.getDate() - 3
    );
    this.secondNewsDate = this.secondNewsDate.setDate(
      this.secondNewsDate.getDate() - 22
    );
    this.thirdNewsDate = this.thirdNewsDate.setDate(
      this.thirdNewsDate.getDate() - 41
    );
    this._ShoppingService.showHeader = true;
    this._ShoppingService.showNavBar = true;
    this._ShoppingService.showCheckoutHeader = false;
    this._AuthService.decode();
    this._ShoppingService.createCart();
    this._ShoppingService.getNewProducts();
  }
  ngOnDestroy() {
    if (this.subscription) this.subscription.unsubscribe();
  }
}
