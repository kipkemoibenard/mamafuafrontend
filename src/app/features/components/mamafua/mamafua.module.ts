import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MamafuaRoutingModule } from './mamafua-routing.module';
import { MamafuaDashboardComponent } from './components/mamafua-dashboard/mamafua-dashboard.component';
import { ButtonModule } from 'primeng/button';
import { FormControl, FormGroup } from '@angular/forms';


@NgModule({
  declarations: [
    MamafuaDashboardComponent
  ],
  imports: [
    CommonModule,
    MamafuaRoutingModule,
    ButtonModule,
  ]
})
export class MamafuaModule { }