import { Component, OnDestroy, OnInit } from '@angular/core';
import { ClientService } from '../../services/client.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ClientDTO } from '../../models/clientDTO';
import { AdminService } from '../../../admin/service/admin.service';

@Component({
  selector: 'app-client-dashboard',
  templateUrl: './client-dashboard.component.html',
  styleUrls: ['./client-dashboard.component.css']
})
export class ClientDashboardComponent implements OnInit, OnDestroy {
  clientRegistrationForm!: FormGroup;
  client: ClientDTO | undefined
  availableServices: [] = [];
  checked: boolean = false;
  clientEmail!: string;
  checkedServices: { svcId: number, svcName: string, svcCost: string }[] = [];


  constructor(
    private clientService: ClientService,
    private fb: FormBuilder,
    private adminService: AdminService,
  ) { }

  ngOnInit(): void {
    this.getClientRegistrationForm();
    this.getAllServices();
    this.getStoredEmail();

  }

  ngOnDestroy(): void {

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

  register() {
    const clientData = this.clientRegistrationForm.value;
    const payload = {
      clntName: clientData.name,
      clntResidenceArea: clientData.residentialArea,
      clntResidentialPlot: clientData.plot,
      clntHouseNo: clientData.hseNumber,
      county: clientData.county,
      email: clientData.email,
      password: clientData.password,
    }
    this.clientService.saveClient(payload).subscribe((post) => {
      alert("Registered!")
    })
  }

  getAllServices() {
    this.adminService.getAllServices().subscribe((services: any) => {
      this.availableServices = services;
      console.log("AllServices", this.availableServices);
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
    const dataToSend = {
      email: this.clientEmail,
      checkedServices: this.checkedServices,
      totalCost: totalCost,
      status: 'Booked',
    };
    console.log("booked", dataToSend);
    
  }
  

}
