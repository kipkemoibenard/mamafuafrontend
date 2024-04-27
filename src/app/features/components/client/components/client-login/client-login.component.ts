import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ClientDTO } from '../../models/clientDTO';
import { ClientService } from '../../services/client.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-client-login',
  templateUrl: './client-login.component.html',
  styleUrls: ['./client-login.component.css']
})
export class ClientLoginComponent implements OnInit, OnDestroy {
  clientLoginForm!: FormGroup;
  client: ClientDTO | undefined;

  constructor(
    private clientService: ClientService,
    private fb: FormBuilder,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getClientLoginForm();
  }

  ngOnDestroy(): void {

  }

  getClientLoginForm() {
    this.clientLoginForm = this.fb.group({
      email: [""],
      password: [""],
    })
  }

  login() {
    const loginRequest = this.clientLoginForm.value;
    const email = this.clientLoginForm.value.email;
    console.log("email", email);
    this.clientService.clientLogin(loginRequest).subscribe((post) => {
        alert("Successful");
        sessionStorage.setItem('email', email);
        if(email === 'admin@gmail.com') {
          this.router.navigate(['home/admin/dashboard']);
        } else {
          this.router.navigate(['home/client/dashboard']);
        }
      
      
    }, (error) => {
      alert("Invalid email or password");
    });
  }

  home() {
    this.router.navigate(['home']);
  }
}
