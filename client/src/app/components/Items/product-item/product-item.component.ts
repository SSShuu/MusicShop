import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/shared/auth/auth.service';
import { ShoppingService } from 'src/app/shared/shopping/shopping.service';
import { AdminEditComponent } from '../../Dialogs/admin-edit/admin-edit.component';
import { DeleteItemComponent } from '../../Dialogs/delete-item/delete-item.component';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css'],
})
export class ProductItemComponent implements OnInit, OnDestroy {
  subscription!: Subscription;
  @Input() product: any;
  @Input() item: any;

  showContent: boolean = false;
  constructor(
    public _Router: Router,
    public _ShoppingService: ShoppingService,
    public _AuthService: AuthService,
    public _Dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this._AuthService.decode();
    setTimeout(() => (this.showContent = true), 2100);
  }
  goToSelectedItem(itemID: string) {
    localStorage.setItem('itemID', itemID);
    this._Router.navigateByUrl(`product-item/${itemID}`);
  }
  openAdminEditDialog(id: string) {
    this._Dialog.open(AdminEditComponent, {
      height: '90vh',
      width: '65vw',
      data: { id },
    });
  }
  openDeleteWarningDialog(id: string) {
    this._Dialog.open(DeleteItemComponent, { data: { id } });
  }
  ngOnDestroy() {
    if (this.subscription) this.subscription.unsubscribe();
  }
}
