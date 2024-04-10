import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MamafuaService {

  constructor(
    private http: HttpClient
  ) { }

  baseUrl = "http://localhost:8585/mamafua";

  mamafuaLogin(loginRequest: any) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json' // Set Content-Type header to JSON
    });

    return this.http.post(`${this.baseUrl}/login`, loginRequest, { headers: headers });
  }

  saveMamafua(payload: any) {
    return this.http.post(`${this.baseUrl}/register`, payload);
  }
}
