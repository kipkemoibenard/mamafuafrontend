import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MamafuaService {

  constructor(
    private http: HttpClient
  ) { }

  baseUrl = "http://localhost:8585";

  mamafuaLogin(loginRequest: any) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json' // Set Content-Type header to JSON
    });

    return this.http.post(`${this.baseUrl}/mamafua/login`, loginRequest, { headers: headers });
  }

  saveMamafua(payload: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/mamafua/register`, payload, { responseType: 'text' });
  }

  getAllRequestedServices(){
    return this.http.get(`${this.baseUrl}/request/allRequestedServices`);
  }

  updateRequestedServices(payload: any, id: number) {
    return this.http.put(`${this.baseUrl}/request/updateRequestedService/${id}`, payload);
  }
}
