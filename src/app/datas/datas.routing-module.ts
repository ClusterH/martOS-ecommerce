import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../core/authentication/auth.guard';
import { DatasComponent } from './datas.component';


const routes: Routes = [
  {
    path: '',
    component: DatasComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class DatasRoutingModule { }
