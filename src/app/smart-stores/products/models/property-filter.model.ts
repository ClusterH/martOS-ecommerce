import { PropertyType } from './property-type';

export interface PropertyFilter {
    id: number;
    value: string;
    type: PropertyType;
}
