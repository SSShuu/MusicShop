import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ShoppingService } from 'src/app/shared/shopping/shopping.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit, OnDestroy {
  subscription!: Subscription;
  constructor(
    public _ShoppingService: ShoppingService,
    public _Router: Router,
    public _ActiveRoute: ActivatedRoute,
    public _Location: Location,
    public _ShoppingServics: ShoppingService
  ) {}

  ngOnInit(): void {
    this._Router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };
    this._ShoppingService.category = localStorage.getItem('categoryName');
    this._ShoppingService.getProductsByCategory(
      localStorage.getItem('categoryID')
    );
  }
  ngOnDestroy() {
    if (this.subscription) this.subscription.unsubscribe();
  }
}
