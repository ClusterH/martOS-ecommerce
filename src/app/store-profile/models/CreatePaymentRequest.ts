import { Bank } from "./Bank";
import { CardDetails } from "../../smart-stores/models/CardDetails";

export type CreatePaymentRequest = {
    bank: Bank;
    cardDetails: CardDetails;
};