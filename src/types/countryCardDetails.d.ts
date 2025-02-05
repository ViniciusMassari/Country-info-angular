type NativeName = Pick<CountryNameInfo, 'common' | 'official'>;
interface FlagImagesurls {
  png: string;
  svg: string;
  alt: string;
}

interface CountryNameInfo {
  common: string;
  official: string;
  nativeName: { [key: string]: NativeName };
}

export interface CountryCardDetails {
  flags: FlagImagesurls;
  name: CountryNameInfo;
  capital: string[];
  region: string;
  population: number;
}
