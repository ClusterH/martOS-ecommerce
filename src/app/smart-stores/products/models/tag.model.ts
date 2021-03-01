import { PropertyType } from './property-type';

export interface Tag {
  id: number;
  name?: string;
  linkedTemplates?: string[];
  allTemplatesLinked?: string;
  tagType?: PropertyType;
  type?: TagType;
}

export interface TagAttribute {
  id?: number;
  tagId?: number;
  name?: string;
  value?: string;
}

export enum TagType {
  Category,
  Option,
  Information
}

export interface SubCategoryReq {
  categoryId: number;
  subCatName: string;
}
