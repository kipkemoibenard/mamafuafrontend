import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-mamafua-login',
  templateUrl: './mamafua-login.component.html',
  styleUrls: ['./mamafua-login.component.css']
})
export class MamafuaLoginComponent implements OnInit, OnDestroy {
  mamafuaLoginForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
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
    
  }
}
