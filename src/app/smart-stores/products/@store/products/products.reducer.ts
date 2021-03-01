import * as fromActions from './products.action';
import {
  Product,
  PropertyFilter,
  SearchAnyRequest,
  ArticlesOverall,
  Article,
  Tag,
  ProductRequest
} from '../../models';

export class ProductsState {
  products: Product[];
  product: ProductRequest;
  groupedArticles: ArticlesOverall[];
  articles: Article[];
  articleIds: number[];
  tags: Tag[];
  categories: Tag[];
  options: Tag[];
  filters: PropertyFilter[];
  filterValues: string[];
  request: SearchAnyRequest;
  loading: any;
  error: string;
}

const initialState: ProductsState = {
  products: [],
  product: null,
  groupedArticles: [],
  articles: [],
  articleIds: [],
  tags: [],
  categories: [],
  options: [],
  filters: [],
  filterValues: [],
  request: {
    storeId: null,
    options: [],
    optionsAttributes: [],
  },
  loading: {},
  error: '',
};

export function productsReducer(
  state: ProductsState = initialState,
  action: fromActions.ProductsActions
): ProductsState {
  switch (action.type) {
    case fromActions.LOAD_PRODUCTS: {
      return {
        ...state,
        loading: { ...state.loading, products: true },
      };
    }

    case fromActions.LOAD_PRODUCTS_SUCCESS: {
      return {
        ...state,
        products: action['payload'],
        loading: { ...state.loading, products: false },
      };
    }

    case fromActions.LOAD_PRODUCTS_FAIL: {
      return {
        ...state,
        loading: { ...state.loading, products: false },
        error: action['payload'],
      };
    }

    case fromActions.LOAD_GROUPED_ARTICLES: {
      return {
        ...state,
        loading: { ...state.loading, articles: true },
      };
    }

    case fromActions.LOAD_GROUPED_ARTICLES_SUCCESS: {
      return {
        ...state,
        groupedArticles: action['payload'],
        loading: { ...state.loading, articles: false },
      };
    }

    case fromActions.LOAD_GROUPED_ARTICLES_FAIL: {
      return {
        ...state,
        loading: { ...state.loading, articles: false },
        error: action['payload'],
      };
    }

    case fromActions.LOAD_ARTICLES_BY_IDS: {
      return {
        ...state,
        loading: { ...state.loading, articles: true },
      };
    }

    case fromActions.LOAD_ARTICLES_BY_IDS_SUCCESS: {
      return {
        ...state,
        articles: action['payload'],
        loading: { ...state.loading, articles: false },
      };
    }

    case fromActions.LOAD_ARTICLES_BY_IDS_FAIL: {
      return {
        ...state,
        loading: { ...state.loading, articles: false },
        error: action['payload'],
      };
    }

    case fromActions.LOAD_TAGS: {
      return {
        ...state,
        loading: { ...state.loading, tags: true },
      };
    }

    case fromActions.LOAD_TAGS_SUCCESS: {
      return {
        ...state,
        tags: action['payload'],
        loading: { ...state.loading, tags: false },
      };
    }

    case fromActions.LOAD_TAGS_FAIL: {
      return {
        ...state,
        loading: { ...state.loading, tags: false },
        error: action['payload'],
      };
    }
    case fromActions.LOAD_CATEGORIES: {
      return {
        ...state,
        loading: { ...state.loading, tags: true },
      };
    }

    case fromActions.LOAD_CATEGORIES_SUCCESS: {
      return {
        ...state,
        categories: action['payload'],
        loading: { ...state.loading, tags: false },
      };
    }

    case fromActions.LOAD_CATEGORIES_FAIL: {
      return {
        ...state,
        loading: { ...state.loading, tags: false },
        error: action['payload'],
      };
    }

    case fromActions.LOAD_OPTIONS: {
      return {
        ...state,
        loading: { ...state.loading, tags: true },
      };
    }

    case fromActions.LOAD_OPTIONS_SUCCESS: {
      return {
        ...state,
        options: action['payload'],
        loading: { ...state.loading, tags: false },
      };
    }

    case fromActions.LOAD_OPTIONS_FAIL: {
      return {
        ...state,
        loading: { ...state.loading, tags: false },
        error: action['payload'],
      };
    }

    case fromActions.DELETE_TAG: {
      return {
        ...state,
        loading: { ...state.loading, tags: true },
      };
    }

    case fromActions.DELETE_TAG_SUCCESS: {
      return {
        ...state,
        tags: state.tags.filter(tag => tag.id !== action['payload']),
        loading: { ...state.loading, tags: false },
      };
    }

    case fromActions.DELETE_TAG_FAIL: {
      return {
        ...state,
        loading: { ...state.loading, tags: false },
        error: action['payload'],
      };
    }

    case fromActions.LOAD_FILTERS: {
      return {
        ...state,
        loading: { ...state.loading, filters: true },
      };
    }

    case fromActions.LOAD_FILTERS_SUCCESS: {
      return {
        ...state,
        filters: action['payload'],
        loading: { ...state.loading, filters: false },
      };
    }

    case fromActions.LOAD_FILTERS_FAIL: {
      return {
        ...state,
        loading: { ...state.loading, filters: false },
        error: action['payload'],
      };
    }

    case fromActions.LOAD_FILTER_VALUES: {
      return {
        ...state,
        loading: { ...state.loading, filterValues: true },
      };
    }

    case fromActions.LOAD_FILTER_VALUES_SUCCESS: {
      return {
        ...state,
        filterValues: action['payload'],
        loading: { ...state.loading, filterValues: false },
      };
    }

    case fromActions.LOAD_FILTER_VALUES_FAIL: {
      return {
        ...state,
        loading: { ...state.loading, filterValues: false },
        error: action['payload'],
      };
    }

    case fromActions.SET_SERACH_REQUEST: {
      return {
        ...state,
        request: action['payload'],
      };
    }

    case fromActions.SET_ARTICLE_IDS: {
      return {
        ...state,
        articleIds: action['payload'],
      };
    }

    case fromActions.SAVE_PRODUCT: {
      return {
        ...state,
        loading: { ...state.loading, product: true },
      };
    }

    case fromActions.SAVE_PRODUCT_SUCCESS: {
      return {
        ...state,
        product: action['payload'],
        loading: { ...state.loading, product: false }
      };
    }

    case fromActions.SAVE_PRODUCT_FAIL: {
      return {
        ...state,
        loading: { ...state.loading, product: false },
        error: action['payload'],
      };
    }

    case fromActions.DELETE_PRODUCT: {
      return {
        ...state,
        loading: { ...state.loading, product: true },
      };
    }

    case fromActions.DELETE_PRODUCT_SUCCESS: {
      return {
        ...state,
        products: state.products.filter(p => p.id !== action['payload'].id),
        loading: { ...state.loading, product: false }
      };
    }

    case fromActions.DELETE_PRODUCT_FAIL: {
      return {
        ...state,
        loading: { ...state.loading, product: false },
        error: action['payload'],
      };
    }

    case fromActions.RESET_SELECTED_PRODUCT: {
      return {
        ...state,
        product: null,
      };
    }

    case fromActions.SELECT_PRODUCT: {
      return {
        ...state,
        product: action['payload'],
      };
    }

    default: {
      return state;
    }
  }
}

export const getProductsState: any = (state: ProductsState): ProductsState => state;

export const getLoading: any = (state: ProductsState): any => state.loading;

export const getProducts: any = (state: ProductsState): Product[] => state.products;
export const getProduct: any = (state: ProductsState): ProductRequest => state.product;
export const getGroupedArticles: any = (state: ProductsState): ArticlesOverall[] => state.groupedArticles;
export const getArticles: any = (state: ProductsState): Article[] => state.articles;
export const getTags: any = (state: ProductsState): Tag[] => state.tags;
export const getCategories: any = (state: ProductsState): Tag[] => state.categories;
export const getOptions: any = (state: ProductsState): Tag[] => state.options;

export const getFilters: any = (state: ProductsState): PropertyFilter[] => state.filters;
export const getFilterValues: any = (state: ProductsState): string[] => state.filterValues;

export const getRequest: any = (state: ProductsState): SearchAnyRequest => state.request;
export const getArticleIds: any = (state: ProductsState): number[] => state.articleIds;
