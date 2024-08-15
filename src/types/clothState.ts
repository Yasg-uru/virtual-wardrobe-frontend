export interface clothState {
  recommandedCloths: IClothItem[];
  collections: IClothItem[];
  searchResults: IClothItem[];
  leastWorn: IClothItem[];
  mostworn: IClothItem[];
  underUtilizedCloths:IClothItem[];
  isLoading: boolean;
  Notification:notificationSchema | null;
}
export interface notificationSchema{
  title:string ;
  reminder:string ;

}
export interface IClothItem {
  _id: string;
  userId: string;
  imageurl: string | null;
  category: string;
  color: string;
  size: string;
  brand: string;
  material: string;
  tags: string[];
  purchaseDate: string;
  condition: string;
  wearcount: number;
  lastWorn: string;
  cost: number;
  isFavorite: boolean;
  isArchived: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;

  seasonSuitability: {
    isWinter: boolean;
    isSummer: boolean;
    isSpring: boolean;
    isAutumn: boolean;
  };

  weatherSuitability: {
    isWindSuitable: boolean;
    isRainSuitable: boolean;
    isSnowySuitable: boolean;
    isCloudySuitable: boolean;
    isSunnySuitable: boolean;
  };
}
