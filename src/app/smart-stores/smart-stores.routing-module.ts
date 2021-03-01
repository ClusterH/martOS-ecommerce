import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../core/authentication/auth.guard';


const routes: Routes = [
    {
      path: 'products',
      canActivate: [AuthGuard],
      children: [
        // { path: 'products', loadChildren: () => import('./products/products.module').then(m => m.ProductsModule),  },
        { path: '', loadChildren: () => import('./products/products.module').then(m => m.ProductsModule), canActivate: [AuthGuard]},
   //     { path: 'article', component: ArticleComponent, canActivate: [AuthGuard] },
        //{ path: 'options', component: OptionComponent, canActivate: [AuthGuard] },
       // { path: 'options/:id', component: OptionDetailsComponent, canActivate: [AuthGuard] },
    //    { path: 'categories', component: CategoryComponent, canActivate: [AuthGuard] },
   //     { path: 'categories/:id', component: CategoryDetailsComponent, canActivate: [AuthGuard] },
   //     { path: 'informations', component: InformationComponent, canActivate: [AuthGuard] },
   //     { path: 'informations/:id', component: InformationDetailsComponent, canActivate: [AuthGuard] },
      ]
    }
    // { path: 'template', component: TemplateComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class SmartStoresRoutingModule { }
