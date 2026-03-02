export type CountryFlags = {
  png: string;
  svg: string;
  alt?: string;
}

export type CountryName = {
  common: string;
  official: string;
}

export type CountryBasic = {
  name: CountryName;
  flags: CountryFlags;
}

export type CountryDetail = {
  name: CountryName;
  flags: CountryFlags;
  capital?: string[];
  region: string;
  subregion?: string;
  population: number;
  languages?: { [key: string]: string };
}
