import { DOCUMENT } from '@angular/common';
import { Inject, OnDestroy } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ShoppingService } from 'src/app/shared/shopping/shopping.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
})
export class FooterComponent implements OnInit, OnDestroy {
  subscription!: Subscription;

  constructor(
    @Inject(DOCUMENT) private dom: Document,
    public _Router: Router,
    public _ShoppingService: ShoppingService
  ) {}

  ngOnInit(): void {
    this._ShoppingService.getProducts().subscribe((res: any) => {
      this._ShoppingService.products = res;
    });
  }
  backToPageTop() {
    this.dom.body.scrollTop = 0;
    this.dom.documentElement.scrollTop = 0;
  }
  ngOnDestroy() {
    if (this.subscription) this.subscription.unsubscribe();
  }
}
