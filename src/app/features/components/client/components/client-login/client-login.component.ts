import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ClientDTO } from '../../models/clientDTO';
import { ClientService } from '../../services/client.service';

@Component({
  selector: 'app-client-login',
  templateUrl: './client-login.component.html',
  styleUrls: ['./client-login.component.css']
})
export class ClientLoginComponent implements OnInit, OnDestroy {
  clientLoginForm!: FormGroup;
  client: ClientDTO | undefined

  constructor(
    private clientService: ClientService,
    private fb: FormBuilder,
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
    
  }
}
