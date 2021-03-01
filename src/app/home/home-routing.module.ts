import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IndexComponent } from './index/index.component';
import { AuthGuard } from '../core/authentication/auth.guard';

const routes: Routes = [
    {
      path: 'home',
      component: IndexComponent,
      canActivate:[AuthGuard]
    }

    // { path: '', redirectTo: '/home', pathMatch: 'full' },
    // { path: 'home', component: IndexComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class HomeRoutingModule { }
