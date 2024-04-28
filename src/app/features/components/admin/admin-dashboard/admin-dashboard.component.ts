import { Component, OnDestroy, OnInit } from '@angular/core';
import { AdminService } from '../service/admin.service';
import { ClientService } from '../../client/services/client.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MamafuaService } from '../../mamafua/services/mamafua.service';

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
  serviceProviderRegFormVisible: boolean = false;
  serviceRegistrationFormForm!: FormGroup;
  serviceProviderRegForm!: FormGroup;
  intervalId: any;
  availableServiceCode!: number;
  editMode: boolean = false;
  errorMessage: string = '';
  serviceProviderCode!: number;


  constructor(
    private adminService: AdminService,
    private clientService: ClientService,
    private fb: FormBuilder,
    private router: Router,
    private mamaFuaService: MamafuaService,
  ) {

  }

  ngOnInit(): void {
    this.startAutoRefresh()
    this.getAllClients();
    this.getAllServices();
    this.getAllMamafua();
    this.serviceRegistrationForm();
    this.serviceProviderRegistrationForm();
  }

  ngOnDestroy(): void {

  }

  showRegisterDialog() {
    this.visible = true;
  }

  showServiceProviderDialog() {
    this.editMode = false;
    this.serviceProviderRegForm.reset();
    this.serviceProviderRegFormVisible = true;
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

  showEditServiceProviderDialog(serviceProviders: any) {
    this.editMode = true
    console.log("serviceProvidersToEd", serviceProviders)
    this.serviceProviderRegFormVisible = true;
    this.serviceProviderCode = serviceProviders.mamafuaId;

    this.serviceProviderRegForm.patchValue({
      name: serviceProviders.mamafuaName,
      county: serviceProviders.county,
      email: serviceProviders.email,
      password: serviceProviders.password,
      confirmPassword: serviceProviders.password,
    });

  }

  serviceRegistrationForm() {
    this.serviceRegistrationFormForm = this.fb.group({
      serviceName: [""],
      serviceCost: [""],
    })
  }

  serviceProviderRegistrationForm() {
    this.serviceProviderRegForm = this.fb.group({
      name: ["", Validators.required],
      county: ["", Validators.required],
      residentialArea: [""],
      plot: [""],
      hseNumber: [""],
      email: ["", Validators.required],
      password: ["", Validators.required],
      confirmPassword: ["", Validators.required],
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

  registerServiceProvider() {
    const clientData = this.serviceProviderRegForm.value;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const payload = {
      mamafuaName: clientData.name,
      county: clientData.county,
      email: clientData.email,
      password: clientData.password,
    }

    if(this.serviceProviderRegForm.invalid) {
      alert("Fill all the fields")
      return;
    } else if (!emailRegex.test(clientData.email)) {
      alert("Invalid email format!");
      return;
    } else if (clientData.password !== clientData.confirmPassword) {
      alert("Passwords do not match! Ensure you capture correct passwords.")
      // Clear password and confirm password fields
      this.serviceProviderRegForm.get('password')?.reset();
      this.serviceProviderRegForm.get('confirmPassword')?.reset();
      return;
    } else {
      this.mamaFuaService.saveMamafua(payload).subscribe(
        (response: any) => {
          if (response === "Email already registered!") {
            this.errorMessage = "Email already registered!";
            alert(this.errorMessage)
          } else {
            alert("Registered!");
            this.getAllMamafua();
            this.serviceProviderRegForm.reset();
            this.serviceProviderRegFormVisible = false;
          }
        },
        (error: any) => {
          console.error('Error during registration:', error);
          // Handle error if needed
        }
      );
    }
  }

  editServiceProvider() {
    const clientData = this.serviceProviderRegForm.value;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const payload = {
      mamafuaName: clientData.name,
      county: clientData.county,
      email: clientData.email,
    }

    if(this.serviceProviderRegForm.invalid) {
      alert("Fill all the fields")
      return;
    } else if (!emailRegex.test(clientData.email)) {
      alert("Invalid email format!");
      return;
    } else if (clientData.password !== clientData.confirmPassword) {
      alert("Passwords do not match! Ensure you capture correct passwords.")
      // Clear password and confirm password fields
      this.serviceProviderRegForm.get('password')?.reset();
      this.serviceProviderRegForm.get('confirmPassword')?.reset();
      return;
    } else {
      this.adminService.editServiceProvider(payload, this.serviceProviderCode).subscribe(
        (response: any) => {
            alert("Edit successful!");
            this.getAllMamafua();
            this.serviceProviderRegForm.reset();
            this.serviceProviderRegFormVisible = false;
        },
        (error: any) => {
          console.error('Error during update:', error);
          // Handle error if needed
        }
      );
    }
  }

  deleteServiceProvider(serviceProviders: any, event: Event) {
    if (window.confirm("Are you sure you want to Delete this service provider?")) {
      console.log("ServiceProviderToDel", serviceProviders)
      const idToDel = serviceProviders.mamafuaId;

      this.adminService.deleteServiceProvider(idToDel).subscribe((res) => {
        alert("Deleted");
        this.getAllMamafua();
      })
    } else {
      // do nothing...
    }


  }

}
