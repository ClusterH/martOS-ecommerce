import { Tag, TagAttribute } from './tag.model';

export interface SearchAnyRequest {
    storeId: number;
    reference?: string;
    name?: string;
    brand?: string;
    liveStatus?: boolean;
    liveStatusBool?: boolean;
    itemId?: number;
    options?: Tag[];
    optionsAttributes?: TagAttribute[];
    category?: Tag;
    categoryAttribute?: TagAttribute;
}
