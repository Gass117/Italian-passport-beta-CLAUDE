export interface Region {
  id: string;
  name: string;
  displayName: string;
  capitalCity: string;
  shapeAssetName: string;
  centerLatitude: number;
  centerLongitude: number;
  themeColorHex: string;
}

export interface Badge {
  title: string;
  imageName: string; // SF Symbol name to be mapped or Lucide icon
  description: string;
  imageAsset?: any; // require(...) or URI
  trophyAsset?: any; // Optional 3D .glb file for 100% completion
}

export type PlaceType = 'city' | 'borgo' | 'landmark';

export interface Place {
  id: string;
  regionId: string;
  name: string;
  type: PlaceType;
  province: string;
  latitude: number;
  longitude: number;
  shortDescription: string;
  docTips: string[];
  nightTips?: string[];
  badge: Badge;
}

export interface PlacesData {
  regions: Region[];
  places: Place[];
}
