import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ShoppingService } from 'src/app/shared/shopping/shopping.service';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.css'],
})
export class  BasketComponent implements OnInit, OnDestroy {
  subscription!: Subscription;

  constructor(
    @Inject(MAT_DIALOG_DATA) public _Data: any,
    public _Router: Router,
    public _Route: ActivatedRoute,
    public _ShoppingService: ShoppingService
  ) {}

  ngOnInit(): void {
    this._ShoppingService.showRemoveItem = true
    this._ShoppingService.getCartItems(localStorage.getItem('cart'));
  }
  proceedToCheckOut() {
    this._Router.navigateByUrl('/checkout');
  }
  ngOnDestroy() {
    if (this.subscription) this.subscription.unsubscribe();
  }
}
