import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientRoutingModule } from './client-routing.module';
import { ClientDashboardComponent } from './components/client-dashboard/client-dashboard.component';
import { CleaningServicesComponent } from './components/cleaning-services/cleaning-services.component';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ClientLoginComponent } from './components/client-login/client-login.component';
import { ClientRegistrationComponent } from './components/client-registration/client-registration.component';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { TableModule } from 'primeng/table';
import { CheckboxModule } from 'primeng/checkbox';


@NgModule({
  declarations: [
    ClientDashboardComponent,
    CleaningServicesComponent,
    ClientLoginComponent,
    ClientRegistrationComponent
  ],
  imports: [
    CommonModule,
    ClientRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ButtonModule,
    InputTextModule,
    OverlayPanelModule,
    ConfirmDialogModule,
    TableModule,
    CheckboxModule
  ]
})
export class ClientModule { }
