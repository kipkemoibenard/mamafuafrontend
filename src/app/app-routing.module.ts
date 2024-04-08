import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  // { path: 'client', loadChildren: () => import('./features/components/client/client.module').then((m) => m.ClientModule) },
  // { path: 'mamafua', loadChildren: () => import('./features/components/mamafua/mamafua.module').then((m) => m.MamafuaModule) },
  { path: 'home', loadChildren: () => import('./features/components/homepage/homepage.module').then((m) => m.HomepageModule) },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
