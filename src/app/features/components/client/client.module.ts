import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientRoutingModule } from './client-routing.module';
import { ClientLoginComponent } from './components/client-login/client-login.component';
import { ClientDashboardComponent } from './components/client-dashboard/client-dashboard.component';


@NgModule({
  declarations: [
    ClientLoginComponent,
    ClientDashboardComponent
  ],
  imports: [
    CommonModule,
    ClientRoutingModule
  ]
})
export class ClientModule { }
