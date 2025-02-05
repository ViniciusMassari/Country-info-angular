type NativeName = Pick<CountryNameInfo, 'common' | 'official'>;
interface FlagImagesurls {
  png: string;
  svg: string;
}

interface CountryNameInfo {
  common: string;
  official: string;
  nativeName: NativeName[];
}

export interface CountryCardDetails {
  flags: FlagImagesurls;
  name: CountryNameInfo;
  capital: string[];
  region: string;
  population: number;
}
