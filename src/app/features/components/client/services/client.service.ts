import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(
    private http: HttpClient
  ) { }
  baseUrl = "http://localhost:8585/client";

  getAllClients() {
    return this.http.get(`${this.baseUrl}/allClients`);
  }
}
