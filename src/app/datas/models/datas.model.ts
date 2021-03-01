export interface OrdersData {
  id?: number;
  date: string;
  orderNumber: string;
  articles: number;
  taxes: number;
  paymentFee: number;
  deliveryFee: number;
  incomeExclT: number;
  incomeInclT: number;
}

export interface ProductData {
  id?: number;
  date: string;
  referenceProd: string;
  articles: number;
  taxes: number;
  incomeExclT: number;
  incomeInclT: number;
}

export interface SalesData {
  id?: number;
  date?: string;
  reference: string;
  salesNumber: number;
  articles: number;
  taxes: number;
  incomeExclT: number;
  incomeInclT: number;
}
