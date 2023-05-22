import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ShoppingService } from 'src/app/shared/shopping/shopping.service';

@Component({
  selector: 'app-check-out-item',
  templateUrl: './check-out-item.component.html',
  styleUrls: ['./check-out-item.component.css'],
})
export class CheckOutItemComponent implements OnInit, OnDestroy {
  @Input() item: any;
  subscription!: Subscription;

  constructor(
    public _ShoppingService: ShoppingService,
    public _Router: Router
  ) {}

  ngOnInit(): void {
    this.checkUrl();
  }
  incrementQty(item: any) {
    item.amount += 1;
    this._ShoppingService.updateQuantity = true;
  }
  decrementQty(item: any) {
    if (item.amount > 1) item.amount -= 1;
    this._ShoppingService.updateQuantity = true;
  }
  updateItemAmount(item: any) {
    console.log(item);
    this._ShoppingService.updateQuantity = false;
    this._ShoppingService.updateItemQuantity(item._id, {
      amount: item.amount,
      product_name: item.product_name,
      product_price: item.product_price,
      image: item.image,
      total_price: item.amount * item.product_price,
      shopping_cart: localStorage.getItem('cart'),
    });
    this._ShoppingService.updateQuantity = false;
  }
  checkUrl() {
    if (this._Router.url == '/checkout') {
      this._ShoppingService.showRemoveItem = false;
    }
  }
  ngOnDestroy() {
    if (this.subscription) this.subscription.unsubscribe();
  }
}
