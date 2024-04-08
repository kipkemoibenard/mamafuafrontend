import { Component, OnDestroy, OnInit } from '@angular/core';
import { ClientService } from '../../services/client.service';

@Component({
  selector: 'app-client-dashboard',
  templateUrl: './client-dashboard.component.html',
  styleUrls: ['./client-dashboard.component.css']
})
export class ClientDashboardComponent implements OnInit, OnDestroy {

  constructor(
    private clientService: ClientService
  ) {}

  ngOnInit(): void {
    this.getAllClients();
  }

  ngOnDestroy(): void {
    
  }

  getAllClients() {
    this.clientService.getAllClients().subscribe((clients) => {
      console.log("AllClients", clients);
    })
  }

}
