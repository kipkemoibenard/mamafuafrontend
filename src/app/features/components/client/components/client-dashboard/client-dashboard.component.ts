import { Component, OnDestroy, OnInit } from '@angular/core';
import { ClientService } from '../../services/client.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ClientDTO } from '../../models/clientDTO';
import { AdminService } from '../../../admin/service/admin.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-client-dashboard',
  templateUrl: './client-dashboard.component.html',
  styleUrls: ['./client-dashboard.component.css']
})
export class ClientDashboardComponent implements OnInit, OnDestroy {
  clientRegistrationForm!: FormGroup;
  client: ClientDTO | undefined
  availableServices: [] = [];
  requestedServices: any[] = [];
  checked: boolean = false;
  clientEmail!: string;
  checkedServices: { svcId: number, svcName: string, svcCost: string }[] = [];
  intervalId: any;
  totalCost!: number;
  residentialCounty!: string;
  residenceArea!: string;
  residentialPlot!: string;
  house!: string;
  phone!: string;


  constructor(
    private clientService: ClientService,
    private fb: FormBuilder,
    private adminService: AdminService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.startAutoRefresh();
    this.getClientRegistrationForm();
    this.getAllServices();
    this.getStoredEmail();
    this.getClientRequestedServices();
    this.getAllClients();

  }

  ngOnDestroy(): void {
    // this.stopAutoRefresh();
  }

  getStoredEmail() {
    const storedEmail = sessionStorage.getItem('email');
    if (storedEmail !== null) {
      this.clientEmail = storedEmail;
      console.log("retrieved Email", this.clientEmail)
    } else {
      // Handle case where email is null, maybe provide a default value or do something else
    }

  }

  startAutoRefresh(): void {
    // Set interval to refresh every 5 seconds (5000 milliseconds)
    this.intervalId = setInterval(() => {
      this.refreshData();
    }, 5000);
  }

  refreshData(): void {
    this.getClientRequestedServices();
    // this.getAllServices();
  }

  stopAutoRefresh(): void {
    // Clear interval to stop auto-refresh
    clearInterval(this.intervalId);
  }
  

  getClientRegistrationForm() {
    this.clientRegistrationForm = this.fb.group({
      name: [""],
      county: [""],
      residentialArea: [""],
      plot: [""],
      hseNumber: [""],
      email: [""],
      password: [""],
      confirmPassword: [""],
    })
  }


  getAllServices() {
    this.adminService.getAllServices().subscribe((services: any) => {
      // Get requested services
      this.clientService.getClientRequestedServices(this.clientEmail).subscribe((requestedServices: any) => {
        console.log("requested", requestedServices);
  
        // Extract service names of requested services
        const requestedServiceNames = requestedServices.map((item: { svcName: any; }) => item.svcName);
  
        // Filter out requested services from available services
        this.availableServices = services.filter((service: { svcName: any; }) => !requestedServiceNames.includes(service.svcName));
  
        console.log("AllServices", this.availableServices);
      });
    });
  }
  
  calculateTotalCost() {
    let totalCost = 0;
    for (const service of this.checkedServices) {
      totalCost += parseFloat(service.svcCost);
    }
    return totalCost;
  }
  
  toggleService(service: { svcId: number, svcName: string, svcCost: string }) {
    const index = this.checkedServices.findIndex(s => s.svcId === service.svcId);
    if (index === -1) {
      this.checkedServices.push(service);
    } else {
      this.checkedServices.splice(index, 1);
    }
  }

  sendDataToAPI() {
    const totalCost = this.calculateTotalCost();
    const req = this.checkedServices;
    console.log("reqssss", req)
    console.log()
    const dataToSend = {
      reqPerson: this.clientEmail,
      county: this.residentialCounty,
      area: this.residenceArea,
      plot: this.residentialPlot,
      house: this.house,
      phone: this.phone,
      requests: this.checkedServices,
      totalCost: totalCost,
      requestStatus: 'Active',
    };
    if (window.confirm("Are you sure you want to request this service?")) {
      console.log("booked", dataToSend);
      this.clientService.postselectedServices(dataToSend).subscribe((save) => {
          console.log("saved", save);
          this.getAllServices();
          this.getClientRequestedServices();
      });
  } else {
      // Do something if the user cancels the action
  }
  
  }

  getClientRequestedServices(): void {
    this.clientService.getClientRequestedServices(this.clientEmail).subscribe((res: any) => {
      console.log("requested", res)
      // Filter out items with null svcCost or svcName
      this.requestedServices = res.filter((item: { svcCost: any; svcName: any; }) => item.svcCost !== null && item.svcName !== null);
      console.log("filtered", this.requestedServices)

      // Calculate total cost
      this.totalCost = this.requestedServices.reduce((acc: number, item: { svcCost: any; }) => {
        // Convert svcCost to number before adding to accumulator
        const cost = parseFloat(item.svcCost);
        // Add cost to accumulator
        return acc + cost;
      }, 0);
    });
  }
  

  logout() {
    this.router.navigate(['/home'])
  }

  getAllClients() {
    this.adminService.getAllClients().subscribe((clients: any) => {
      const clientsData = clients.filter((item: { email: string; }) => item.email === this.clientEmail);
      console.log("ThisClientData", clientsData);
      this.residenceArea = clientsData[0]?.clntResidenceArea;
      this.residentialPlot = clientsData[0]?.clntResidentialPlot;
      this.residentialCounty = clientsData[0]?.county;
      this.house = clientsData[0]?.clntHouseNo;
      this.phone = clientsData[0]?.phone;
      console.log("ThisClientDataFetched", this.residenceArea, this.residentialPlot, this.residentialCounty, this.phone);
    })
  }

}
