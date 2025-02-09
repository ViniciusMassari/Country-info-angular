export interface CountryDetails {
  name: CountryName;
  currencies: { [key: string]: Currencies };
  capital: string[];
  region: string;
  subregion: string;
  languages: { [key: string]: string };
  borders: string[];
  population: number;
  flags: Flags;
}

interface CountryName {
  common: string;
}

interface Currencies {
  name: string;
  symbol: string;
}

interface Eur {
  name: string;
  symbol: string;
}

interface Flags {
  png: string;
  svg: string;
  alt: string;
}
