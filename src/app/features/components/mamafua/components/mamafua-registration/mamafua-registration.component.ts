import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MamafuaService } from '../../services/mamafua.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mamafua-registration',
  templateUrl: './mamafua-registration.component.html',
  styleUrls: ['./mamafua-registration.component.css']
})
export class MamafuaRegistrationComponent implements OnInit, OnDestroy {
  mamafuaRegistrationForm!: FormGroup;
  errorMessage: string = '';

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
      name: ["", Validators.required],
      county: ["", Validators.required],
      residentialArea: [""],
      plot: [""],
      hseNumber: [""],
      email: ["", Validators.required],
      password: ["", Validators.required],
      confirmPassword: ["", Validators.required],
      phone: ["", Validators.required],
    })
  }

  register() {
    const clientData = this.mamafuaRegistrationForm.value;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const payload = {
      mamafuaName: clientData.name,
      county: clientData.county,
      phone: clientData.phone,
      email: clientData.email,
      password: clientData.password,
    }

    if(this.mamafuaRegistrationForm.invalid) {
      alert("Fill all the fields")
      return;
    } else if (!emailRegex.test(clientData.email)) {
      alert("Invalid email format!");
      return;
    } else if (clientData.password !== clientData.confirmPassword) {
      alert("Passwords do not match! Ensure you capture correct passwords.")
      // Clear password and confirm password fields
      this.mamafuaRegistrationForm.get('password')?.reset();
      this.mamafuaRegistrationForm.get('confirmPassword')?.reset();
      return;
    } else {
      this.mamaFuaService.saveMamafua(payload).subscribe(
        (response: any) => {
          if (response === "Email already registered!") {
            this.errorMessage = "Email already registered!";
            alert(this.errorMessage)
          } else {
            alert("Registered!");
            this.router.navigate(['home/mamafua/login']);
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
