import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MamafuaService } from '../../services/mamafua.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mamafua-login',
  templateUrl: './mamafua-login.component.html',
  styleUrls: ['./mamafua-login.component.css']
})
export class MamafuaLoginComponent implements OnInit, OnDestroy {
  mamafuaLoginForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private mamaFuaService: MamafuaService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.getMamafuaLoginForm();
  }

  ngOnDestroy(): void {

  }

  getMamafuaLoginForm() {
    this.mamafuaLoginForm = this.fb.group({
      email: [""],
      password: [""],
    })
  }

  login() {
    const loginRequest = this.mamafuaLoginForm.value;
    const email = this.mamafuaLoginForm.value.email;
    this.mamaFuaService.mamafuaLogin(loginRequest).subscribe((post) => {
        alert("Successful");
        sessionStorage.setItem('email', email);
      this.router.navigate(['home/mamafua/dashboard']);
      
    }, (error) => {
      alert("Invalid email or password");
    });
  }
}
