import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/shared/auth/auth.service';
import { AdminEditComponent } from '../../Dialogs/admin-edit/admin-edit.component';
import { DeleteItemComponent } from '../../Dialogs/delete-item/delete-item.component';

@Component({
  selector: 'app-new-releases',
  templateUrl: './new-releases.component.html',
  styleUrls: ['./new-releases.component.css'],
})
export class NewReleasesComponent implements OnInit {
  @Input() new: any;
  constructor(
    public _Router: Router,
    public _AuthService: AuthService,
    public _Dialog: MatDialog
  ) {}

  ngOnInit(): void {}

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
}
