import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DownloadReciptService {
  constructor(public http: HttpClient) {}

  downloadFile(email: string, x: string): Observable<any> {
    const param = new HttpParams().set('filename', x);
    const options = {
      params: param,
    };
    return this.http.get(`http://localhost:5000/recipt/${email}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')} ` },
      ...options,
      responseType: 'blob',
    });
  }
}
