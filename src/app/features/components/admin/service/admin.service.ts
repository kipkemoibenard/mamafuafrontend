import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  constructor(
    private http: HttpClient
  ) { }
  baseUrl = "http://localhost:8585";

  getAllClients() {
    return this.http.get(`${this.baseUrl}/client/allClients`);
  }

  getAllServices() {
    return this.http.get(`${this.baseUrl}/service/getAvailableServices`);
  }

  getAllMamafua() {
    return this.http.get(`${this.baseUrl}/mamafua/getAllMamafua`);
  }
}