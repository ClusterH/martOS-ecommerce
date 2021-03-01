export interface ArticleCategorie {
  name: string;
  value: string;
}
export interface ArticleOption {
  name: string;
  value: string;
}


export interface OrderArticle {
  id?: any;
  name: string;
  brand: string;
  minimumStock: number;
  price: string;
  itemId: number;
  totalStock: number;
  options: ArticleOption[];
  categories: ArticleCategorie[];
}


export interface Order {
  id: string;
  referenceStoreId: string;
  price: number;
  vat: number;
  totalPrice: number;
  created: string;
  orderStatus: OrderStatus;
  storeOrderType: StoreOrderType;
  articles: OrderArticle[];
}

export interface OrderRequestModel {
  country: string;
  orders: Order[];
}


export enum OrderStatus {
  Pending = 0,
  OnGoing = 1,
  Done = 2
}

export enum StoreOrderType {
  PickUpInStore = 0,
  StoreDelivery = 1,
  MartOsDelivery = 2
}
