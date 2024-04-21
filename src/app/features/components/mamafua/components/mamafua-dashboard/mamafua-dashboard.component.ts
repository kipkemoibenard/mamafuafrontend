import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MamafuaService } from '../../services/mamafua.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mamafua-dashboard',
  templateUrl: './mamafua-dashboard.component.html',
  styleUrls: ['./mamafua-dashboard.component.css']
})
export class MamafuaDashboardComponent implements OnInit, OnDestroy {
  mamafuaRegistrationForm!: FormGroup;
  availableServices: any[] = [];
  requestedServices: any[] = [];
  acceptedServices: any[] = [];
  mamafuaEmail!: string;

  constructor(
    private fb: FormBuilder,
    private mamafuaService : MamafuaService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.getAllRequestedServices();
    this.getStoredEmail();
  }

  ngOnDestroy(): void {

  }

  getStoredEmail() {
    const storedEmail = sessionStorage.getItem('email');
    if (storedEmail !== null) {
      this.mamafuaEmail = storedEmail;
      console.log("retrieved Email", this.mamafuaEmail)
    } else {
      //to work on this
    }

  }

  getAllRequestedServices(){
    this.mamafuaService.getAllRequestedServices().subscribe((res: any) => {
      this.requestedServices = res.filter((item: { requestStatus: string}) => item.requestStatus !== 'Accepted');
      this.acceptedServices = res.filter((item: { reqSvcProvider: string}) => item.reqSvcProvider === this.mamafuaEmail);
      console.log("requested", res)
      console.log("Available", this.requestedServices)
      console.log("My accepted", this.acceptedServices)
    })
  }

  toggleService(service: {
    reqId: any; "": any; 
}) {
  
    console.log("selected", service)
    const id = service.reqId
    const payload = {
      requestStatus: "Accepted",
      reqSvcProvider: this.mamafuaEmail,
    }
    
      this.mamafuaService.updateRequestedServices(payload, id).subscribe((res) => {
        if(res) {
          this.getAllRequestedServices();
        }
        
      })
   
    
  }

  sendDataToAPI() {
  }

  logout() {
    this.router.navigate(['/home'])
  }

}
