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
  availableServices: [] = [];
  clients: [] = [];
  serviceProviders: [] = [];
  requestedServices: any[] = [];
  clientEmail!: string;
  selectedRowIndex: number | undefined;
  visible: boolean = false;
  serviceRegistrationFormForm!: FormGroup;
  intervalId: any;
  availableServiceCode!: number;
  editMode: boolean = false;


  constructor(
    private adminService: AdminService,
    private clientService: ClientService,
    private fb: FormBuilder,
    private router: Router,
  ) {

  }

  ngOnInit(): void {
    this.startAutoRefresh()
    this.getAllClients();
    this.getAllServices();
    this.getAllMamafua();
    this.serviceRegistrationForm();
  }

  ngOnDestroy(): void {

  }

  showRegisterDialog() {
    this.visible = true;
  }

  showDialog(availableServices: any) {
    this.editMode = true
    console.log("availableServicesToEd", availableServices)
    this.visible = true;
    this.availableServiceCode = availableServices.svcId;

    this.serviceRegistrationFormForm.patchValue({
      serviceName: availableServices.svcName,
      serviceCost: availableServices.svcCost,
    });

  }

  serviceRegistrationForm() {
    this.serviceRegistrationFormForm = this.fb.group({
      serviceName: [""],
      serviceCost: [""],
    })
  }

  startAutoRefresh(): void {
    // Set interval to refresh every 5 seconds (5000 milliseconds)
    this.intervalId = setInterval(() => {
      this.refreshData();
    }, 5000);
  }

  refreshData(): void {
    this.getAllClients();
    // this.getAllServices();
    this.getAllMamafua();
  }

  getAllClients() {
    this.adminService.getAllClients().subscribe((clients: any) => {
      console.log("AllClients", clients);
      this.clients = clients.filter((item: { email: string; }) => item.email !== 'admin@gmail.com');
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
      this.serviceProviders = servicesProviders.filter((item: { email: string; }) => item.email !== 'admin@gmail.com');
    })
  }

  getClientRequestedServices() {
    this.clientService.getClientRequestedServices(this.clientEmail).subscribe((res: any) => {
      console.log("requested", res)
      this.requestedServices = res.filter((item: { svcCost: null; svcName: null; }) => item.svcCost !== null && item.svcName !== null);
      console.log("filtered", this.requestedServices)
    })
  }

  onClientsTableRowClick(requestedServices: any, index: number) {
    this.selectedRowIndex = index;
    if (requestedServices) {
      this.clientEmail = requestedServices.email;
      console.log("this.clientEmail", this.clientEmail);
      this.getClientRequestedServices();
    }
  }

  registerService() {
    const formData = this.serviceRegistrationFormForm.value;
    const payload = {
      svcName: formData.serviceName,
      svcCost: formData.serviceCost,
    }
    this.adminService.registerService(payload).subscribe((res) => {
      this.getAllServices();
      alert("Service registered")
      this.serviceRegistrationFormForm.reset();
      this.visible = false;

    })
  }

  logout() {
    this.router.navigate(['/home'])
  }

  editAvailableService() {
    const formData = this.serviceRegistrationFormForm.value;
    const idToEdit = this.availableServiceCode

    const payload = {
      svcName: formData.serviceName,
      svcCost: formData.serviceCost,
    }


    this.adminService.editService(payload, idToEdit).subscribe((res) => {
      alert("Edited");
      this.getAllServices();
      this.serviceRegistrationFormForm.reset();
      this.visible = false;
    })

  }

  deleteAvailableService(availableServices: any, event: Event) {
    if (window.confirm("Are you sure you want to Delete this service?")) {
      console.log("availableServicesToDel", availableServices)
      const idToDel = availableServices.svcId;

      this.adminService.deleteService(idToDel).subscribe((res) => {
        alert("Deleted");
        this.getAllServices();
      })
    } else {
      // do nothing...
    }


  }
}
