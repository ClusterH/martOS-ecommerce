import { Tag, TagAttribute } from './tag.model';
import { LiveStatus } from './live-status';

export interface ArticlesOverall {
    id: number;
    itemId: number;
    reference: string;
    name: string;
    brand: number;
    liveStatus: LiveStatus;
    minimumStock: string;
    totalStock: number;
    template: string;
    productType: TagAttribute;
    category: Tag;
    tags: Tag[];
    articleIds: number[];
    tagAttributes: TagAttribute[];
}
