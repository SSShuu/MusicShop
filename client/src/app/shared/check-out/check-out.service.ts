import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class CheckOutService {
  baseURL: string = 'http://localhost:5000';
  enableChekout = true

  constructor(public _Http: HttpClient,public _Router:Router) {}

  paymentSubmit(body: any) {
    this._Http.post(`${this.baseURL}/order`, body).subscribe((res: any) => {
    });
  }
}
