import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import Product from 'src/app/components/Interfaces/product';
import Category from 'src/app/components/Interfaces/category';
import CartItem from 'src/app/components/Interfaces/cart-item';
import Order from 'src/app/components/Interfaces/order';

@Injectable({
  providedIn: 'root',
})
export class ShoppingService {
  baseURL: string = 'http://localhost:5000';
  category: any = [];
  categories: Category[] = [];
  products: Product[] = [];
  productsByCategory: any[] = [];
  cartItems: CartItem[] = [];
  selectedCtegoryId: string = '';
  selectedItemQty: number = 1;
  selectedItem: any = null;
  selectedImage: number = 1;
  updateQuantity: boolean = false;
  totalPrice: number = 0;
  newReleases: Product[] = [];
  customerOrders: Order[] = [];
  showFooter: boolean = true;
  showHeader: boolean = true;
  showNavBar: boolean = true;
  showCheckoutHeader: boolean = false;
  showRemoveItem: boolean = true;

  constructor(public Http: HttpClient, public _Router: Router) {}

  getCategories() {
    return this.Http.get(`${this.baseURL}/category`).subscribe((res: any) => {
      this.categories = res;
    });
  }
  getProducts() {
    return this.Http.get(`${this.baseURL}/product`);
  }
  getProductItem(id: string | null) {
    return this.Http.get(`${this.baseURL}/product/item/${id}`);
  }
  getProductsByCategory(CategoryID: string | null) {
    return this.Http.get(`${this.baseURL}/product/${CategoryID}`).subscribe(
      (res: any) => {
        this.productsByCategory = res;
      }
    );
  }
  createCart() {
    if (!localStorage.getItem('cart')) {
      this.Http.post(`${this.baseURL}/cart`, {}).subscribe((res: any) => {
        localStorage.setItem('cart', res._id);
      });
    }
  }

  addProductToCart(body: any) {
    return this.Http.post(`${this.baseURL}/item`, body).subscribe(
      (res: any) => {
        if ((res.itemExisting = false)) this.cartItems = res;
      }
    );
  }
  getCartItems(id: string | null) {
    this.Http.get(`${this.baseURL}/item/${id}`).subscribe((res: any) => {
      this.cartItems = res;
      this.calculateTotalPrice(res);
    });
  }
  deleteItemFromCart(id: string) {
    this.Http.delete(`${this.baseURL}/item/${id}`).subscribe((res: any) => {
      this.totalPrice -= res.total_price;
      this.getCartItems(localStorage.getItem('cart'));
      this.calculateTotalPrice(this.cartItems);
    });
  }
  updateItemQuantity(id: string, body: any) {
    return this.Http.put(`${this.baseURL}/item/${id}`, body).subscribe(
      (res: any) => {
        this.getCartItems(localStorage.getItem('cart'));
      }
    );
  }

  getNewProducts() {
    return this.Http.get(`${this.baseURL}/product/new`).subscribe(
      (res: any) => {
        this.newReleases = res;
      }
    );
  }

  calculateTotalPrice(items: any) {
    if (items) {
      this.totalPrice = 0;
      this.cartItems.map(
        (item) => (this.totalPrice = this.totalPrice + item.total_price)
      );
    }
  }
  addProductByAdmin(body: any) {
    this.Http.post(`${this.baseURL}/product`, body).subscribe((res: any) => {
      this.products.push(res);
      this.getProductsByCategory(res.category);
    });
  }
  updateProductByAdmin(id: string, body: any) {
    this.Http.put(`${this.baseURL}/product/${id}`, {}).subscribe((res: any) => {
      console.log(res);
      this.getProducts();
    });
  }
  deleteProductsByAdmin(id: string) {
    this.Http.delete(`${this.baseURL}/product/delete/${id}`).subscribe(
      (res: any) => {
        this.getProductsByCategory(res.category);
      }
    );
  }
  getOrdersByCustomer(id: string | null) {
    this.Http.get(`${this.baseURL}/order/${id}`).subscribe((res: any) => {
      this.customerOrders = res;
    });
  }

  resetCart(id: string | null) {
    this.Http.delete(`${this.baseURL}/item/reset/${id}`).subscribe((res) => {});
  }
}
