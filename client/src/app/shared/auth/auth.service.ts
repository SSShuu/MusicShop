import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import User from 'src/app/components/Interfaces/user';
import { SnackBarService } from '../snackBar/snack-bar.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  baseURL: string = 'http://localhost:5000';
  helper = new JwtHelperService();
  currentUser: User = {
    _id: null,
    first_name: null,
    last_name: null,
    email: null,
    password: null,
    isAdmin: null,
  };
  constructor(
    public Http: HttpClient,
    public _Router: Router,
    public _SnackBar: SnackBarService
  ) {}

  decode() {
    const decodedToken = this.helper.decodeToken(
      localStorage.getItem('token') || undefined
    );
    if (decodedToken) {
      this.currentUser = decodedToken.user;
    } else return;
  }

  signUp(body: any) {
    this.Http.post(`${this.baseURL}/auth/register`, body).subscribe(
      (res: any) => {
        if (res.error == true) {
          this._SnackBar.showSnackBar(res.message);
        } else {
          this._Router.navigateByUrl('sign-in');
        }
      }
    );
  }

  login(body: any) {
    this.Http.post(`${this.baseURL}/auth/login`, body).subscribe((res: any) => {
      console.log(res);
      if (res.error == true) {
        this._SnackBar.showSnackBar(res.message);
      } else {
        localStorage.setItem('token', res.access_token);
        this.decode();
        this._SnackBar.showSnackBar(
          `WELCOME ${this.currentUser.first_name} ${this.currentUser.last_name} !`
        );
        this._Router.navigateByUrl('');
      }
    });
  }
  loggedIn(): boolean {
    const token = localStorage.getItem('token');
    return !this.helper.isTokenExpired(token || undefined);
  }
  logout() {
    localStorage.clear();
    this.currentUser._id = null;
    this.currentUser.first_name = null;
    this.currentUser.last_name = null;
    this.currentUser.email = null;
    this.currentUser.password = null;
    this.currentUser.isAdmin = null;
    this._Router.navigateByUrl('');
    this._SnackBar.showSnackBar('YOU HAVE BEEN LOGGED OUT');
  }

  clearUser() {
    localStorage.removeItem('cart');
    localStorage.removeItem('categoryName');
    localStorage.removeItem('categoryID');
    localStorage.removeItem('itemID');
  }
}
