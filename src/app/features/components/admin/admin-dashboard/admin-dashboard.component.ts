import { Component, OnDestroy, OnInit } from '@angular/core';
import { AdminService } from '../service/admin.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit, OnDestroy {
  availableServices: []=[];
  clients: []=[];
  serviceProviders: []=[];
  constructor(
    private adminService: AdminService
  ) {

  }

  ngOnInit(): void {
    this.getAllClients();
    this.getAllServices();
    this.getAllMamafua();
  }

  ngOnDestroy(): void {
    
  }

  getAllClients() {
    this.adminService.getAllClients().subscribe((clients: any) => {
      console.log("AllClients", clients);
      this.clients = clients;
    })
  }

  getAllServices() {
    this.adminService.getAllServices().subscribe((services: any) => {
      this.availableServices = services;
      console.log("AllServices", this.availableServices);
    });
  }

  getAllMamafua() {
    this.adminService.getAllMamafua().subscribe((servicesProviders: any) => {
      console.log("AllServicesProviders", servicesProviders);
      this.serviceProviders = servicesProviders;
    })
  }
}
