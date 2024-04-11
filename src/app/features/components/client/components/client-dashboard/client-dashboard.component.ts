import { Component, OnDestroy, OnInit } from '@angular/core';
import { ClientService } from '../../services/client.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ClientDTO } from '../../models/clientDTO';

@Component({
  selector: 'app-client-dashboard',
  templateUrl: './client-dashboard.component.html',
  styleUrls: ['./client-dashboard.component.css']
})
export class ClientDashboardComponent implements OnInit, OnDestroy {
  clientRegistrationForm!: FormGroup;
  client: ClientDTO | undefined

  constructor(
    private clientService: ClientService,
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.getClientRegistrationForm();
  }

  ngOnDestroy(): void {

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

}
