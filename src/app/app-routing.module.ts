import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'client', loadChildren: () => import('./features/components/client/client.module').then((m) => m.ClientModule) },
  { path: 'mamafua', loadChildren: () => import('./features/components/mamafua/mamafua.module').then((m) => m.MamafuaModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
