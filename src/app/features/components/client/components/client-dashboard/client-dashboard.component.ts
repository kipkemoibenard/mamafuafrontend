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

}
