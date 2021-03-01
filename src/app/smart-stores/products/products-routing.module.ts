import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {
  ProductsComponent,
  ArticleComponent,
  ArticleDetailsComponent,
  CategoryComponent,
  OptionComponent,
  InformationComponent,
  CreateProductComponent,
  OptionDetailsComponent,
  CategoryDetailsComponent
} from './containers';


const routes: Routes = [
  { path: '', component: ProductsComponent },
  { path: 'new', component: CreateProductComponent },

  { path: 'article/:id', component: ArticleComponent },
  { path: 'article-details/:id', component: ArticleDetailsComponent },

  { path: 'categories', component: CategoryComponent },
  { path: 'categories/create', component: CategoryDetailsComponent },
  { path: 'categories/edit/:id', component: CategoryDetailsComponent },

  { path: 'options', component: OptionComponent },
  { path: 'options/create', component: OptionDetailsComponent },
  { path: 'options/edit/:id', component: OptionDetailsComponent },

  { path: 'informations', component: InformationComponent },
  { path: 'informations/:id', component: InformationComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
