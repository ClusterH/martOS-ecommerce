import { Tag } from './';
import { Article } from './article.model';
import { TagAttribute } from './tag.model';

export interface Product {
  id?: number;
  reference: string;
  name: string;
  brand: string;
  liveStatus?: boolean;
  articleCount?: number;
  tags?: Tag[];
  allTags?: string;
  categoryAttributes: TagAttribute[];
  price: string;
  promotion?: number;
  promotionEndDate?: Date;
  canDelivery?: boolean;
  haveDimension?: boolean;
  height?: number;
  long?: number;
  width?: number;
  weight?: number;
  articles: Article[];
  presImage: string;
  description?: string;
  categories?: Tag[];
  //taxedPrice: number;
}

export interface ProductRequest {
  storeId: string;
  item: Product;
}
