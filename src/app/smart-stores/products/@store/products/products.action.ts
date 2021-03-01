import { Action } from '@ngrx/store';

import {
  Product,
  PropertyFilter,
  SearchAnyRequest,
  ArticlesOverall,
  OnlineRequest,
  Article,
  Tag,
  TagType,
  ProductRequest
} from 'src/app/smart-stores/products/models';

export const LOAD_PRODUCTS = '[Products] Load Products';
export const LOAD_PRODUCTS_SUCCESS = '[Products] Load Products Success';
export const LOAD_PRODUCTS_FAIL = '[Products] Load Products Fail';
export class LoadProducts implements Action {
  readonly type: string = LOAD_PRODUCTS;
  constructor(public payload?: SearchAnyRequest) { }
}
export class LoadProductsSuccess implements Action {
  readonly type: string = LOAD_PRODUCTS_SUCCESS;
  constructor(public payload: Product[]) { }
}
export class LoadProductsFail implements Action {
  readonly type: string = LOAD_PRODUCTS_FAIL;
  constructor(public payload: any) { }
}

export const LOAD_GROUPED_ARTICLES = '[Products] Load Grouped Articles';
export const LOAD_GROUPED_ARTICLES_SUCCESS = '[Products] Load Grouped Articles Success';
export const LOAD_GROUPED_ARTICLES_FAIL = '[Products] Load Grouped Articles Fail';
export class LoadGroupedArticles implements Action {
  readonly type: string = LOAD_GROUPED_ARTICLES;
  constructor(public payload?: SearchAnyRequest) { }
}
export class LoadGroupedArticlesSuccess implements Action {
  readonly type: string = LOAD_GROUPED_ARTICLES_SUCCESS;
  constructor(public payload: ArticlesOverall[]) { }
}
export class LoadGroupedArticlesFail implements Action {
  readonly type: string = LOAD_GROUPED_ARTICLES_FAIL;
  constructor(public payload: any) { }
}

export const LOAD_ARTICLES_BY_IDS = '[Products] Load Articles By Ids';
export const LOAD_ARTICLES_BY_IDS_SUCCESS = '[Products] Load Articles By Ids Success';
export const LOAD_ARTICLES_BY_IDS_FAIL = '[Products] Load Articles By Ids Fail';
export class LoadArticlesByIds implements Action {
  readonly type: string = LOAD_ARTICLES_BY_IDS;
  constructor(public payload: number[]) { }
}
export class LoadArticlesByIdsSuccess implements Action {
  readonly type: string = LOAD_ARTICLES_BY_IDS_SUCCESS;
  constructor(public payload: Article[]) { }
}
export class LoadArticlesByIdsFail implements Action {
  readonly type: string = LOAD_ARTICLES_BY_IDS_FAIL;
  constructor(public payload: any) { }
}

export const LOAD_FILTERS = '[Products] Load Filters';
export const LOAD_FILTERS_SUCCESS = '[Products] Load Filters Success';
export const LOAD_FILTERS_FAIL = '[Products] Load Filters Fail';
export class LoadFilters implements Action {
  readonly type: string = LOAD_FILTERS;
}
export class LoadFiltersSuccess implements Action {
  readonly type: string = LOAD_FILTERS_SUCCESS;
  constructor(public payload: any[]) { }
}
export class LoadFiltersFail implements Action {
  readonly type: string = LOAD_FILTERS_FAIL;
  constructor(public payload: any) { }
}

export const LOAD_FILTER_VALUES = '[Products] Load Filter Values';
export const LOAD_FILTER_VALUES_SUCCESS = '[Products] Load Filter Values Success';
export const LOAD_FILTER_VALUES_FAIL = '[Products] Load Filter Values Fail';
export class LoadFilterValues implements Action {
  readonly type: string = LOAD_FILTER_VALUES;
  constructor(public payload: PropertyFilter) { }
}
export class LoadFilterValuesSuccess implements Action {
  readonly type: string = LOAD_FILTER_VALUES_SUCCESS;
  constructor(public payload: string[]) { }
}
export class LoadFilterValuesFail implements Action {
  readonly type: string = LOAD_FILTER_VALUES_FAIL;
  constructor(public payload: any) { }
}

export const LOAD_TAGS = '[Products] Load Tags';
export const LOAD_TAGS_SUCCESS = '[Products] Load Tags Success';
export const LOAD_TAGS_FAIL = '[Products] Load Tags Fail';
export class LoadTags implements Action {
  readonly type: string = LOAD_TAGS;
  constructor(public payload: TagType) { }
}
export class LoadTagsSuccess implements Action {
  readonly type: string = LOAD_TAGS_SUCCESS;
  constructor(public payload: Tag[]) { }
}
export class LoadTagsFail implements Action {
  readonly type: string = LOAD_TAGS_FAIL;
  constructor(public payload: any) { }
}

export const LOAD_OPTIONS = '[Products] Load Options';
export const LOAD_OPTIONS_SUCCESS = '[Products] Load Options Success';
export const LOAD_OPTIONS_FAIL = '[Products] Load Options Fail';
export class LoadOptions implements Action {
  readonly type: string = LOAD_OPTIONS;
}
export class LoadOptionsSuccess implements Action {
  readonly type: string = LOAD_OPTIONS_SUCCESS;
  constructor(public payload: Tag[]) { }
}
export class LoadOptionsFail implements Action {
  readonly type: string = LOAD_OPTIONS_FAIL;
  constructor(public payload: any) { }
}

export const LOAD_CATEGORIES = '[Products] Load Categories';
export const LOAD_CATEGORIES_SUCCESS = '[Products] Load Categories Success';
export const LOAD_CATEGORIES_FAIL = '[Products] Load Categories Fail';
export class LoadCategories implements Action {
  readonly type: string = LOAD_CATEGORIES;
}
export class LoadCategoriesSuccess implements Action {
  readonly type: string = LOAD_CATEGORIES_SUCCESS;
  constructor(public payload: Tag[]) { }
}
export class LoadCategoriesFail implements Action {
  readonly type: string = LOAD_CATEGORIES_FAIL;
  constructor(public payload: any) { }
}

export const DELETE_TAG = '[Products] Delete Tag';
export const DELETE_TAG_SUCCESS = '[Products] Delete Tag Success';
export const DELETE_TAG_FAIL = '[Products] Delete Tag Fail';
export class DeleteTag implements Action {
  readonly type: string = DELETE_TAG;
  constructor(public payload: number) { }
}
export class DeleteTagSuccess implements Action {
  readonly type: string = DELETE_TAG_SUCCESS;
  constructor(public payload: number) { }
}
export class DeleteTagFail implements Action {
  readonly type: string = DELETE_TAG_FAIL;
  constructor(public payload: any) { }
}

export const SET_SERACH_REQUEST = '[Products] Set Search Request';
export class SetSearchRequest implements Action {
  readonly type: string = SET_SERACH_REQUEST;
  constructor(public payload: SearchAnyRequest) { }
}

export const SET_ARTICLE_IDS = '[Products] Set Article Ids';
export class SetArticleIds implements Action {
  readonly type: string = SET_ARTICLE_IDS;
  constructor(public payload: number[]) { }
}

export const SET_ONLINE_STATUS = '[Products] Set Online Status';
export const SET_ONLINE_STATUS_SUCCESS = '[Products] Set Online Status Success';
export const SET_ONLINE_STATUS_FAIL = '[Products] Set Online Status Fail';
export class SetOnlineStatus implements Action {
  readonly type: string = SET_ONLINE_STATUS;
  constructor(public payload: OnlineRequest) { }
}
export class SetOnlineStatusSuccess implements Action {
  readonly type: string = SET_ONLINE_STATUS_SUCCESS;
}
export class SetOnlineStatusFail implements Action {
  readonly type: string = SET_ONLINE_STATUS_FAIL;
  constructor(public payload: any) { }
}

export const SAVE_PRODUCT = '[Products] Save Product';
export const SAVE_PRODUCT_SUCCESS = '[Products] Save Product Success';
export const SAVE_PRODUCT_FAIL = '[Products] Save Product Fail';
export class SaveProduct implements Action {
  readonly type: string = SAVE_PRODUCT;
  constructor(public payload: ProductRequest) { }
}
export class SaveProductSuccess implements Action {
  readonly type: string = SAVE_PRODUCT_SUCCESS;
  constructor(public payload: ProductRequest) { }
}
export class SaveProductFail implements Action {
  readonly type: string = SAVE_PRODUCT_FAIL;
  constructor(public payload: any) { }
}

export const DELETE_PRODUCT = '[Products] Delete Product';
export const DELETE_PRODUCT_SUCCESS = '[Products] Delete Product Success';
export const DELETE_PRODUCT_FAIL = '[Products] Delete Product Fail';
export class DeleteProduct implements Action {
  readonly type: string = DELETE_PRODUCT;
  constructor(public payload: any) { }
}
export class DeleteProductSuccess implements Action {
  readonly type: string = DELETE_PRODUCT_SUCCESS;
  constructor(public payload: number) { }
}
export class DeleteProductFail implements Action {
  readonly type: string = DELETE_PRODUCT_FAIL;
  constructor(public payload: any) { }
}

export const SELECT_PRODUCT = '[Products] Select Product';
export class SelectProduct implements Action {
  readonly type: string = SELECT_PRODUCT;
  constructor(public payload: { storeId?: number; item: Product }) { }
}


export const RESET_SELECTED_PRODUCT = '[Products] Reset Selected Product';
export class ResetSelectedProduct implements Action {
  readonly type: string = RESET_SELECTED_PRODUCT;
}

export type ProductsActions = LoadProducts
  | LoadProductsSuccess
  | LoadProductsFail
  | SaveProduct
  | SaveProductSuccess
  | SaveProductFail
  | DeleteProduct
  | DeleteProductSuccess
  | DeleteProductFail
  | LoadFilters
  | LoadFiltersSuccess
  | LoadFiltersFail
  | LoadFilterValues
  | LoadFilterValuesSuccess
  | LoadFilterValuesFail
  | LoadGroupedArticles
  | LoadGroupedArticlesSuccess
  | LoadGroupedArticlesFail
  | LoadTags
  | LoadTagsSuccess
  | LoadTagsFail
  | LoadOptions
  | LoadOptionsSuccess
  | LoadOptionsFail
  | LoadCategories
  | LoadCategoriesSuccess
  | LoadCategoriesFail
  | SelectProduct
  | ResetSelectedProduct
  | DeleteTag
  | DeleteTagSuccess
  | DeleteTagFail
  | LoadArticlesByIds
  | LoadArticlesByIdsSuccess
  | LoadArticlesByIdsFail
  | SetSearchRequest
  | SetArticleIds
  | SetOnlineStatus
  | SetOnlineStatusSuccess
  | SetOnlineStatusFail;
