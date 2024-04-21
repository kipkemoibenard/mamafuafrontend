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

  registerService(payload: any) {
    return this.http.post(`${this.baseUrl}/service/save`, payload);
  }

  editService(payload: any, id: any) {
    return this.http.put(`${this.baseUrl}/service/updateAvailableService/${id}`, payload);
  }

  deleteService(id: any) {
    return this.http.delete(`${this.baseUrl}/service/deleteAvailableService/${id}`);
  }
}
