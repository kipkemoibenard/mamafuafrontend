import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingScreenComponent } from './components/landing-screen/landing-screen.component';

const routes: Routes = [
  {path: '', component: LandingScreenComponent},
  {
    path: 'client',
    loadChildren: () => import('../client/client.module').then((m) => m.ClientModule)
  },
  {
    path: 'mamafua',
    loadChildren: () => import('../mamafua/mamafua.module').then((m) => m.MamafuaModule)
  },
  {
    path: 'admin',
    loadChildren: () => import('../admin/admin.module').then((m) => m.AdminModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomepageRoutingModule { }
