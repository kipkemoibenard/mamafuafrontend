import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MamafuaDashboardComponent } from './components/mamafua-dashboard/mamafua-dashboard.component';
import { CommonModule } from '@angular/common';

const routes: Routes = [
  { path: 'dashboard', component: MamafuaDashboardComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MamafuaRoutingModule { }
