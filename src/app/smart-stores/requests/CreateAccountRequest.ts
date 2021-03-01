import { ChainStore } from "../models/ChainStore";
import { User } from "../models/User";
import { CardDetails } from "../models/CardDetails";
import { Subscriptions } from "../models/Subscriptions";
import { Business } from "../models/Business";

export type CreateAccountRequest = {
    user: User;
    chainStore: ChainStore;
    cardDetails :CardDetails;
    subscription: Subscriptions;
    business: Business;
};