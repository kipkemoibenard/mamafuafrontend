import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MamafuaRoutingModule } from './mamafua-routing.module';
import { MamafuaDashboardComponent } from './components/mamafua-dashboard/mamafua-dashboard.component';
import { ButtonModule } from 'primeng/button';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MamafuaLoginComponent } from './components/mamafua-login/mamafua-login.component';
import { InputTextModule } from 'primeng/inputtext';
import { MamafuaRegistrationComponent } from './components/mamafua-registration/mamafua-registration.component';


@NgModule({
  declarations: [
    MamafuaDashboardComponent,
    MamafuaLoginComponent,
    MamafuaRegistrationComponent
  ],
  imports: [
    CommonModule,
    MamafuaRoutingModule,
    ButtonModule,
    FormsModule,
    ReactiveFormsModule,
    InputTextModule,
  ]
})
export class MamafuaModule { }
