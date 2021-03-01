export interface Store {
  id?: number;
  name: string;
  address: string[];
  postalCode: string;
  latitude?: number;
  longitude?: number;
  country?: string;
  selected?: boolean;
  referenceId?: string;
  countryId?: number;
  vat?: number;
  chainName?: string;
  imageUrl?: string;
  imageData?: string;
}
export interface AddImageStore {
  country: string;
  refStoreId: string;
  base64: string;
}
