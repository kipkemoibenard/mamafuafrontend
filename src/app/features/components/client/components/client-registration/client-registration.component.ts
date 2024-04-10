import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ClientDTO } from '../../models/clientDTO';
import { ClientService } from '../../services/client.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-client-registration',
  templateUrl: './client-registration.component.html',
  styleUrls: ['./client-registration.component.css']
})
export class ClientRegistrationComponent implements OnInit, OnDestroy {
  clientRegistrationForm!: FormGroup;
  client: ClientDTO | undefined

  constructor(
    private clientService: ClientService,
    private fb: FormBuilder,
    private router: Router,
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
      this.router.navigate(['home/client/login']);
    })
  }

}

