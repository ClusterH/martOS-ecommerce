import { Store } from "../../smart-stores/models/Store";

export type StoreRequest = {
    chainStoreId: number;
    store: Store;
};