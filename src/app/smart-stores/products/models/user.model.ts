export interface UserInfo {
  id: number;
  name: string;
  familyName: string;
  isOwner: string;
  imageUrl: string;
}

export interface ImgRequest {
  userId: string;
  country: string;
  base64: string;
}
