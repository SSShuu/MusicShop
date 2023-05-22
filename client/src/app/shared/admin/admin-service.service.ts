import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AdminServiceService {
  baseURL: string = 'http://localhost:5000';

  constructor(public Http: HttpClient, public _Router: Router) {}
}
