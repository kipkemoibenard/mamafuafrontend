import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AdminService } from '../../../admin/service/admin.service';
import { ClientService } from '../../../client/services/client.service';
import { MamafuaService } from '../../services/mamafua.service';

@Component({
  selector: 'app-mamafua-dashboard',
  templateUrl: './mamafua-dashboard.component.html',
  styleUrls: ['./mamafua-dashboard.component.css']
})
export class MamafuaDashboardComponent implements OnInit, OnDestroy {
  mamafuaRegistrationForm!: FormGroup;
  availableServices: any[] = [];
  requestedServices: any[] = [];

  constructor(
    private fb: FormBuilder,
    private adminService: AdminService,
    private clientService: ClientService,
    private mamafuaService : MamafuaService
  ) { }

  ngOnInit(): void {
    this.getAllRequestedServices()
  }

  ngOnDestroy(): void {

  }

  getAllRequestedServices(){
    this.mamafuaService.getAllRequestedServices().subscribe((res: any) => {
      console.log("requested", res)
      this.requestedServices = res
    })
  }

  toggleService(service: { svcId: number, svcName: string, svcCost: string }) {
    
  }

  sendDataToAPI() {
  }

}
