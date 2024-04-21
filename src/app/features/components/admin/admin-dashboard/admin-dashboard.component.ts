import { Component, OnDestroy, OnInit } from '@angular/core';
import { AdminService } from '../service/admin.service';
import { ClientService } from '../../client/services/client.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit, OnDestroy {
  availableServices: []=[];
  clients: []=[];
  serviceProviders: []=[];
  requestedServices: any[] = [];
  clientEmail!: string;
  selectedRowIndex: number | undefined;
  visible: boolean = false;
  serviceRegistrationFormForm!: FormGroup;


  constructor(
    private adminService: AdminService,
    private clientService: ClientService,
    private fb: FormBuilder,
    private router: Router,
  ) {

  }

  ngOnInit(): void {
    this.getAllClients();
    this.getAllServices();
    this.getAllMamafua();
    this.serviceRegistrationForm();
  }

  ngOnDestroy(): void {
    
  }

  showDialog() {
    this.visible = true;
}

serviceRegistrationForm() {
  this.serviceRegistrationFormForm = this.fb.group({
    serviceName: [""],
    serviceCost: [""],
  })
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

  getClientRequestedServices(){
    this.clientService.getClientRequestedServices(this.clientEmail).subscribe((res: any) => {
      console.log("requested", res)
      this.requestedServices = res.filter((item: { svcCost: null; svcName: null; }) => item.svcCost !== null && item.svcName !== null);
      console.log("filtered", this.requestedServices)
    })
  }

  onClientsTableRowClick(requestedServices: any, index: number) {
    this.selectedRowIndex = index;
    if(requestedServices){
      this.clientEmail = requestedServices.email;
      console.log("this.clientEmail", this.clientEmail);
      this.getClientRequestedServices();
    }
  }

  registerService() {

  }

  logout() {
    this.router.navigate(['/home'])
  }
}
