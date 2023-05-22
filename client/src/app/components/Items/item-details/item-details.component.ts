import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ShoppingService } from 'src/app/shared/shopping/shopping.service';
import { MatDialog } from '@angular/material/dialog';
import { BasketComponent } from '../../Dialogs/basket/basket.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-item-details',
  templateUrl: './item-details.component.html',
  styleUrls: ['./item-details.component.css'],
})
export class ItemDetailsComponent implements OnInit, OnDestroy {
  subscription!: Subscription;
  itemID: string | null = localStorage.getItem('itemID');
  imageSrc: string = '';
  showContent: boolean = false;
  dom: any;
  constructor(
    public _Router: Router,
    public _ShoppingService: ShoppingService,
    public _Dialog: MatDialog
  ) {}

  ngOnInit(): void {
    window.scrollTo(0, 0);
    this._ShoppingService.selectedItemQty = 1;
    setTimeout(() => (this.showContent = true), 100);
    this._ShoppingService.getProductItem(this.itemID).subscribe((res: any) => {
      this._ShoppingService.selectedItem = res;
    });
    setTimeout(
      () =>
        (this.imageSrc = this._ShoppingService.selectedItem.product_images[0]),
      100
    );
  }
  incrementQty() {
    this._ShoppingService.selectedItemQty += 1;
  }
  decrementQty() {
    if (this._ShoppingService.selectedItemQty > 1)
      this._ShoppingService.selectedItemQty -= 1;
  }
  addProductToCartHandler(name: string, price: number, image: string) {
    this._ShoppingService.showRemoveItem = true
    this._ShoppingService.addProductToCart({
      product_name: name,
      product_price: price,
      amount: this._ShoppingService.selectedItemQty,
      total_price: this._ShoppingService.selectedItemQty * price,
      image,
      shopping_cart: localStorage.getItem('cart'),
    });
    this._Dialog.open(BasketComponent, {
      height: '90vh',
      width: '50vw',
      data: {
        name,
        price,
        amount: this._ShoppingService.selectedItemQty,
        total_price: this._ShoppingService.selectedItemQty * price,
        image,
      },
    });
  }
  changeImage(src: string) {
    this.imageSrc = src;
  }
  ngOnDestroy() {
    if (this.subscription) this.subscription.unsubscribe();
  }
}
