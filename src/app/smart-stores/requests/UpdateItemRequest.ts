import { TagIdRequest } from './TagIdRequest';

export type UpdateItemRequest = {
    id: number;
    reference: string;
    name: string;
    brand: string;
    liveStatus: boolean;
    tagIds: TagIdRequest[];
};
