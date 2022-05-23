import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/auth/auth.service';
import { DownloadReciptService } from 'src/app/shared/recipt.service';
import { ShoppingService } from 'src/app/shared/shopping/shopping.service';
// import * as fileSaver from 'file-saver';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recipt',
  templateUrl: './recipt.component.html',
  styleUrls: ['./recipt.component.css'],
})
export class ReciptComponent implements OnInit, OnDestroy {
  filename: string = 'recipt.txt';
  subscription!: Subscription;

  constructor(
    public _Router: Router,
    public _ReciptService: DownloadReciptService,
    public _AuthService: AuthService,
    public _ShoppingService: ShoppingService
  ) {}

  ngOnInit(): void {}

  returnBlob(res: any): Blob {
    return new Blob([res]);
  }
  // download() {
  //   this._ReciptService
  //     .downloadFile(this._AuthService.currentUser._id, this.filename)
  //     .subscribe((res: any) => {
  //       fileSaver.saveAs(this.returnBlob(res), this.filename);
  //       this._ShoppingService.resetShoppingCart(this._ShoppingService.cartID);
  //     });
  // }
  // closeRecipt() {
  //   this._ShoppingService.resetShoppingCart(this._ShoppingService.cartID);
  //   this._Router.navigateByUrl('');
  // }
  ngOnDestroy() {
    if (this.subscription) this.subscription.unsubscribe();
  }
}
