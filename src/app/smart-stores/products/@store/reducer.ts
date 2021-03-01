import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';
import * as productsReducer from './products/products.reducer';

export interface ProductsFeatureState {
    products: productsReducer.ProductsState;
}

export const reducers: ActionReducerMap<ProductsFeatureState> = {
    products: productsReducer.productsReducer
};

export const getProductsFeatureState: any = createFeatureSelector('products');
