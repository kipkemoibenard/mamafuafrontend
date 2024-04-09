import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientDashboardComponent } from './components/client-dashboard/client-dashboard.component';
import { CleaningServicesComponent } from './components/cleaning-services/cleaning-services.component';
import { ClientLoginComponent } from './components/client-login/client-login.component';
import { ClientRegistrationComponent } from './components/client-registration/client-registration.component';

const routes: Routes = [
  { path: 'login', component: ClientLoginComponent },
  { path: 'register', component: ClientRegistrationComponent },
  { path: 'dashboard', component: ClientDashboardComponent },
  { path: 'cleaning-services', component: CleaningServicesComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientRoutingModule { }
