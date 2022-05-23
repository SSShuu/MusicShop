import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { CheckOutService } from 'src/app/shared/check-out/check-out.service';
import { ShoppingService } from 'src/app/shared/shopping/shopping.service';

@Injectable({
  providedIn: 'root',
})
export class CheckoutGuard implements CanActivate {
  constructor(
    public _ShoppingService: ShoppingService,
    public _Router: Router,
    public _CheckOutService:CheckOutService
  ) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (!this._CheckOutService.enableChekout) {
      this._Router.navigateByUrl('');
      return false;
    } else {
      return true;
    }
  }
}
