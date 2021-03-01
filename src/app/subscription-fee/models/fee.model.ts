export interface FeeData {
  id?: number;
  date: string;
  invoiceNumber: string;
  stores: string;
  transferBef: number;
  paymentFee: number;
  deliveryFee: number;
  finalTransfer: number;
}
