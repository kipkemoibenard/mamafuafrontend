import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-mamafua-dashboard',
  templateUrl: './mamafua-dashboard.component.html',
  styleUrls: ['./mamafua-dashboard.component.css']
})
export class MamafuaDashboardComponent implements OnInit, OnDestroy {
  mamafuaRegistrationForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.getMamafuaRegistrationForm();
  }

  ngOnDestroy(): void {

  }


  getMamafuaRegistrationForm() {
    this.mamafuaRegistrationForm = this.fb.group({
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
    const clientData = this.mamafuaRegistrationForm.value;
    const payload = {
      clntName: clientData.name,
      clntResidenceArea: clientData.residentialArea,
      clntResidentialPlot: clientData.plot,
      clntHouseNo: clientData.hseNumber,
      county: clientData.county,
      email: clientData.email,
      password: clientData.password,
    }
    // this.clientService.saveClient(payload).subscribe((post) => {
    //   alert("Registered!")
    // })
  }

}
