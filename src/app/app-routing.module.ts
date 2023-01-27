import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HelloComponent, AuthComponent } from 'src/app/components';

const routes: Routes = [
  {
    path: '', 
    redirectTo: 'auth', 
    pathMatch: 'full'
  },
  {
    path: 'auth', 
    component: AuthComponent
  },
  {
    path: 'hello', 
    component: HelloComponent
  },
  { 
    path: '**', 
    redirectTo: 'auth'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
