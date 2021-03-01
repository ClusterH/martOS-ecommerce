import { LiveStatus } from './live-status';
import { TagAttribute } from './tag.model';

export interface Article {
    id: number;
    reference: string;
    name: string;
    itemId: number;
    brand: number;
    price: string;
    promotion?: number;
    promotionEndDate?: Date;
    minimumStock: number;
    stock: number;
    isSold: boolean;
    activationDate: Date;
    soldDate: Date;
    liveStatus: LiveStatus;
    tagAttributes: TagAttribute[];
}
