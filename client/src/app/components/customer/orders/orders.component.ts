import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/shared/auth/auth.service';
import { ShoppingService } from 'src/app/shared/shopping/shopping.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css'],
})
export class OrdersComponent implements OnInit, OnDestroy {
  subscription!: Subscription;

  constructor(
    public _ShoppingService: ShoppingService,
    public _AuthService: AuthService,
    public _Router: Router
  ) {}

  ngOnInit(): void {
    this._AuthService.decode();
    this._ShoppingService.getOrdersByCustomer(
      this._AuthService.currentUser.email
    );
  }
  ngOnDestroy() {
    if (this.subscription) this.subscription.unsubscribe();
  }
}
