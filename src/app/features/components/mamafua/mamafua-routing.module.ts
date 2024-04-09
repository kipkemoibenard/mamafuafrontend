import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MamafuaDashboardComponent } from './components/mamafua-dashboard/mamafua-dashboard.component';
import { CommonModule } from '@angular/common';
import { MamafuaLoginComponent } from './components/mamafua-login/mamafua-login.component';
import { MamafuaRegistrationComponent } from './components/mamafua-registration/mamafua-registration.component';

const routes: Routes = [
  { path: 'login', component: MamafuaLoginComponent },
  { path: 'register', component: MamafuaRegistrationComponent },
  { path: 'dashboard', component: MamafuaDashboardComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MamafuaRoutingModule { }
