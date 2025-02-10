// TODO: testes
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import {
  COUNTRY_BY_NAME_ENDPOINT,
  CountryDetailsService,
} from './country-details.service';
import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';

describe('CountryDetailsService', () => {
  let countryDetailsService: CountryDetailsService;
  let httpTesting: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    countryDetailsService = TestBed.inject(CountryDetailsService);
    httpTesting = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTesting.verify();
  });

  it('Should fetch country detail', () => {
    countryDetailsService.getCountryDetailsByCountryName('brazil').subscribe({
      next: (response) => {
        expect(response).toBe(true);
        expect(response).toHaveProperty('borders');
      },
    });

    const req = httpTesting.expectOne(
      COUNTRY_BY_NAME_ENDPOINT +
        'brazil?fields=name,flags,currencies,capital,region,subregion,languages,borders,population'
    );

    req.flush({
      flags: {
        png: 'https://flagcdn.com/w320/br.png',
        svg: 'https://flagcdn.com/br.svg',
        alt: "The flag of Brazil has a green field with a large yellow rhombus in the center. Within the rhombus is a dark blue globe with twenty-seven small five-pointed white stars depicting a starry sky and a thin white convex horizontal band inscribed with the national motto 'Ordem e Progresso' across its center.",
      },
      name: {
        common: 'Brazil',
        official: 'Federative Republic of Brazil',
        nativeName: {
          por: {
            official: 'República Federativa do Brasil',
            common: 'Brasil',
          },
        },
      },
      currencies: {
        BRL: {
          name: 'Brazilian real',
          symbol: 'R$',
        },
      },
      capital: ['Brasília'],
      region: 'Americas',
      subregion: 'South America',
      languages: {
        por: 'Portuguese',
      },
      borders: [
        'ARG',
        'BOL',
        'COL',
        'GUF',
        'GUY',
        'PRY',
        'PER',
        'SUR',
        'URY',
        'VEN',
      ],
      population: 212559409,
    });

    expect(req.request.method).toBe('GET');
  });

  it('Should fetch correctly a country with space in name', () => {
    countryDetailsService
      .getCountryDetailsByCountryName('Saudi Arabia')
      .subscribe({
        next: (response) => {
          expect(response).toBe(true);
          expect(response).toHaveProperty('borders');
        },
      });

    const req = httpTesting.expectOne({
      method: 'GET',
      url:
        COUNTRY_BY_NAME_ENDPOINT +
        'Saudi Arabia?fields=name,flags,currencies,capital,region,subregion,languages,borders,population',
    });

    req.flush({
      flags: {
        png: 'https://flagcdn.com/w320/sa.png',
        svg: 'https://flagcdn.com/sa.svg',
        alt: 'The flag of Saudi Arabia has a green field, at the center of which is an Arabic inscription — the Shahada — in white above a white horizontal sabre with its tip pointed to the hoist side of the field.',
      },
      name: {
        common: 'Saudi Arabia',
        official: 'Kingdom of Saudi Arabia',
        nativeName: {
          ara: {
            official: 'المملكة العربية السعودية',
            common: 'العربية السعودية',
          },
        },
      },
      currencies: {
        SAR: {
          name: 'Saudi riyal',
          symbol: 'ر.س',
        },
      },
      capital: ['Riyadh'],
      region: 'Asia',
      subregion: 'Western Asia',
      languages: {
        ara: 'Arabic',
      },
      borders: ['IRQ', 'JOR', 'KWT', 'OMN', 'QAT', 'ARE', 'YEM'],
      population: 34813867,
    });

    expect(req.request.method).toBe('GET');
  });
  it('Should fetch incorrectly a country', () => {
    countryDetailsService
      .getCountryDetailsByCountryName('non existent country')
      .subscribe({
        error(err) {
          expect(err.status).toBe(404);
        },
      });

    const req = httpTesting.expectOne({
      method: 'GET',
      url:
        COUNTRY_BY_NAME_ENDPOINT +
        'non existent country?fields=name,flags,currencies,capital,region,subregion,languages,borders,population',
    });

    expect(req.request.method).toBe('GET');
  });
});
