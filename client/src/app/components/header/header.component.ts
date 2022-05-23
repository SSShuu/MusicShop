import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/auth/auth.service';
import { ShoppingService } from 'src/app/shared/shopping/shopping.service';
import { BasketComponent } from '../Dialogs/basket/basket.component';
import { Location } from '@angular/common';
import { AdminAddComponent } from '../Dialogs/admin-add/admin-add.component';
import Product from '../Interfaces/product';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  subscription!: Subscription;
  searchFilter: any;
  showFiltereSearch: boolean = false;
  filteredProducts: Product[] = [];
  products: Product[] = [];
  constructor(
    public _Router: Router,
    public _ShoppingService: ShoppingService,
    public _Dialog: MatDialog,
    public _AuthService: AuthService,
    public _Location: Location
  ) {}

  ngOnInit(): void {
    this._AuthService.decode();
    this._ShoppingService.getProducts().subscribe((res: any) => {
      this.products = res;
      this.filteredProducts = this.products;
    });
    this._ShoppingService.getCartItems(localStorage.getItem('cart'));
  }
  backToHomePage() {
    this._ShoppingService.showCheckoutHeader = false;
    this._ShoppingService.showHeader = true;
    this._ShoppingService.showNavBar = true;
    this._Router.navigateByUrl('');
  }
  openBasketDialog() {
    this._Dialog.open(BasketComponent, { height: '90vh', width: '50vw' });
  }
  openAdminAddProductForm() {
    this._Dialog.open(AdminAddComponent, { height: '90vh', width: '50vw' });
  }
  goToSelectedItem(itemID: string) {
    localStorage.setItem('itemID', itemID);
    this._Router.navigateByUrl(`product-item/${itemID}`);
    this.showFiltereSearch = false;
    this.searchFilter = '';
  }
  onClickedOutside(e: Event) {
    this.showFiltereSearch = false;
  }
  continueShopping() {
    this._ShoppingService.showHeader = true;
    this._ShoppingService.showNavBar = true;
    this._ShoppingService.showCheckoutHeader = false;
    this._Router.navigateByUrl('');
  }
  Search() {
    if (!this.searchFilter) {
      this.showFiltereSearch = false;
      this.filteredProducts = this.products;
    } else {
      this.showFiltereSearch = true;
      this.filteredProducts = this.products.filter(
        (p) =>
          p.product_name
            .toLocaleLowerCase()
            .indexOf(this.searchFilter.toLowerCase()) !== -1
      );
      if (this.filteredProducts.length == 0) this.showFiltereSearch = false;
    }
  }
  ngOnDestroy() {
    if (this.subscription) this.subscription.unsubscribe();
  }
}
