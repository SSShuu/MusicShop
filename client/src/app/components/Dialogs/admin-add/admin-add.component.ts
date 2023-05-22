import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Subscription } from 'rxjs';
import { ShoppingService } from 'src/app/shared/shopping/shopping.service';

@Component({
  selector: 'app-admin-add',
  templateUrl: './admin-add.component.html',
  styleUrls: ['./admin-add.component.css'],
})
export class AdminAddComponent implements OnInit, OnDestroy {
  addProductForm!: FormGroup;
  subscription!: Subscription;
  images!: FormGroup;

  constructor(
    public _FormBuilder: FormBuilder,
    public _ShoppingService: ShoppingService
  ) {}

  ngOnInit(): void {
    this.addProductForm = this._FormBuilder.group({
      product_name: new FormControl('', Validators.required),
      product_price: new FormControl('', Validators.required),
      category: new FormControl('', Validators.required),
    });
    this.images = this._FormBuilder.group({
      first_image: new FormControl('', Validators.required),
      second_image: new FormControl('', Validators.required),
      third_image: new FormControl('', Validators.required),
      fourth_image: new FormControl('', Validators.required),
    });
  }
  addProductByAdminHandler() {
    const body = {
      product_name: this.addProductForm.controls.product_name.value,
      product_price: this.addProductForm.controls.product_price.value,
      category: this.addProductForm.controls.category.value,
      product_images: [
        this.images.controls.first_image.value,
        this.images.controls.second_image.value,
        this.images.controls.third_image.value,
        this.images.controls.fourth_image.value,
      ],
    };
    this._ShoppingService.addProductByAdmin(body);
  }
  ngOnDestroy() {
    if (this.subscription) this.subscription.unsubscribe();
  }
}
