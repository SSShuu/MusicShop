import {
  Component,
  OnDestroy,
  OnInit,
  Renderer2,
  ɵɵNgOnChangesFeature,
} from '@angular/core';
import { Router } from '@angular/router';
import { ShoppingService } from 'src/app/shared/shopping/shopping.service';
import { Location } from '@angular/common';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit, OnDestroy {
  subscription!: Subscription;
  constructor(
    public _ShoppingService: ShoppingService,
    public _Router: Router,
    public _Location: Location
  ) {}

  ngOnInit(): void {
    this._ShoppingService.getCategories();
  }
  selectCategory(name: string, id: string) {
    this.setCatrgoryToLocalStorage(name, id);
    this._ShoppingService.getProductsByCategory(id);
  }
  setCatrgoryToLocalStorage(name: string, id: string) {
    const newName = name.split(' ').join('');
    localStorage.setItem('categoryName', newName);
    localStorage.setItem('categoryID', id);
    this._Router.navigateByUrl(`products/${newName}`);
  }
  ngOnDestroy() {
    if (this.subscription) this.subscription.unsubscribe();
  }
}
