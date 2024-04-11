import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ClientDTO } from '../models/clientDTO';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(
    private http: HttpClient
  ) { }
  baseUrl = "http://localhost:8585/client";

  // getAllClients() {
  //   return this.http.get(`${this.baseUrl}/allClients`);
  // }

  saveClient(payload: any) {
    return this.http.post(`${this.baseUrl}/register`, payload);
  }

  clientLogin(loginRequest: any) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json' // Set Content-Type header to JSON
    });

    return this.http.post(`${this.baseUrl}/login`, loginRequest, { headers: headers });
  }
}
