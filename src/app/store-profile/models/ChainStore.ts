import { Store } from "../../smart-stores/models/Store";

export type ChainStore = {
  id: number;
  name: string;
  expiry: string;
  stores: Store[];
  image_data?: string;
};
