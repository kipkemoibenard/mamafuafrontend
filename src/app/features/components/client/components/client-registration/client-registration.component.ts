import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  client: ClientDTO | undefined;
  errorMessage: string = '';

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
      name: ["", Validators.required],
      county: ["", Validators.required],
      residentialArea: ["", Validators.required],
      plot: ["", Validators.required],
      hseNumber: ["", Validators.required],
      email: ["", Validators.required],
      password: ["", Validators.required],
      confirmPassword: ["", Validators.required],
      phone: ["", Validators.required],
    })
  }

  // register() {
  //   const clientData = this.clientRegistrationForm.value;
  //   const payload = {
  //     clntName: clientData.name,
  //     clntResidenceArea: clientData.residentialArea,
  //     clntResidentialPlot: clientData.plot,
  //     clntHouseNo: clientData.hseNumber,
  //     county: clientData.county,
  //     email: clientData.email,
  //     password: clientData.password,
  //   }
  //   if(this.clientRegistrationForm.invalid) {
  //     alert("Fill all the fields")
  //     return;
  //   }

  //   else if (clientData.password !== clientData.confirmPassword) {
  //     alert("Passwords do not match! Ensure you capture correct passwords.")
  //     // Clear password and confirm password fields
  //   this.clientRegistrationForm.get('password')?.reset();
  //   this.clientRegistrationForm.get('confirmPassword')?.reset();
  //     return;
  //   }
  //   else {
  //     this.clientService.saveClient(payload).subscribe((post) => {
  //       alert("Registered!")
  //       this.router.navigate(['home/client/login']);
  //     });
  //   }
    
  // }
  register() {
    const clientData = this.clientRegistrationForm.value;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const payload = {
          clntName: clientData.name,
          clntResidenceArea: clientData.residentialArea,
          clntResidentialPlot: clientData.plot,
          clntHouseNo: clientData.hseNumber,
          county: clientData.county,
          email: clientData.email,
          phone: clientData.phone,
          password: clientData.password,
        }

    if(this.clientRegistrationForm.invalid) {
      alert("Fill all the fields")
      return;
    } else if (!emailRegex.test(clientData.email)) {
      alert("Invalid email format!");
      return;
    } else if (clientData.password !== clientData.confirmPassword) {
      alert("Passwords do not match! Ensure you capture correct passwords.")
      // Clear password and confirm password fields
      this.clientRegistrationForm.get('password')?.reset();
      this.clientRegistrationForm.get('confirmPassword')?.reset();
      return;
    } else {
      this.clientService.saveClient(payload).subscribe(
        (response: any) => {
          if (response === "Email already registered!") {
            this.errorMessage = "Client with email already registered!";
            alert(this.errorMessage)
          } else {
            alert("Registered!");
            this.router.navigate(['home/client/login']);
          }
        },
        (error: any) => {
          console.error('Error during registration:', error);
          // Handle error if needed
        }
      );
    }
  }

  home() {
    this.router.navigate(['home']);
  }

}

