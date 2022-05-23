import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { ShoppingService } from 'src/app/shared/shopping/shopping.service';

@Component({
  selector: 'app-delete-item',
  templateUrl: './delete-item.component.html',
  styleUrls: ['./delete-item.component.css'],
})
export class DeleteItemComponent implements OnInit, OnDestroy {
  subscription!: Subscription;

  constructor(
    @Inject(MAT_DIALOG_DATA) public _Data: any,
    public _ShoppingService: ShoppingService
  ) {}

  ngOnInit(): void {}
  deleteProductsByAdminHandler(id: string) {
    console.log(id);
    this._ShoppingService.deleteProductsByAdmin(id);
  }
  ngOnDestroy() {
    if (this.subscription) this.subscription.unsubscribe();
  }
}
