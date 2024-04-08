import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MamafuaLoginComponent } from './components/mamafua-login/mamafua-login.component';
import { MamafuaDashboardComponent } from './components/mamafua-dashboard/mamafua-dashboard.component';
import { CommonModule } from '@angular/common';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: MamafuaLoginComponent },
  { path: 'dashboard', component: MamafuaDashboardComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MamafuaRoutingModule { }
