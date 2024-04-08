import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientModule } from './client.module';
import { ClientDashboardComponent } from './components/client-dashboard/client-dashboard.component';
import { CommonModule } from '@angular/common';
import { ClientLoginComponent } from './components/client-login/client-login.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: ClientLoginComponent },
  { path: 'dashboard', component: ClientDashboardComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientRoutingModule { }
