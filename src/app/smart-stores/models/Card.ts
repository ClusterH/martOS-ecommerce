import { BillingAddress } from "./BillingAddress";

export type Card = {
    number: string;
    expiryMonth: string;
    expiryYear?: string;
    cvc: string;
    holderName: string;
    type: string;
    billingAddress: BillingAddress;
};
