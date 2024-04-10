import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MamafuaService } from '../../services/mamafua.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mamafua-registration',
  templateUrl: './mamafua-registration.component.html',
  styleUrls: ['./mamafua-registration.component.css']
})
export class MamafuaRegistrationComponent implements OnInit, OnDestroy {
  mamafuaRegistrationForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private mamaFuaService: MamafuaService,
    private router: Router,
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
      mamafuaName: clientData.name,
      county: clientData.county,
      email: clientData.email,
      password: clientData.password,
    }
    this.mamaFuaService.saveMamafua(payload).subscribe((post) => {
      alert("Registered!")
      this.router.navigate(['home/mamafua/login']);
    })
  }

}
