// TODO: testes
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { CountriesByFilterService } from './countries-by-filter.service';
import { TestBed } from '@angular/core/testing';
import { HttpErrorResponse, provideHttpClient } from '@angular/common/http';

describe('CountryDetailsService', () => {
  const COUNTRY_BY_REGION_FILTER_ENDPOINT =
    'restcountries.com/v3.1/region/' as const;

  let countriesByFilterService: CountriesByFilterService;
  let httpTesting: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    countriesByFilterService = TestBed.inject(CountriesByFilterService);
    httpTesting = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTesting.verify();
  });

  it('Should fetch country card details', () => {
    countriesByFilterService.getCountriesByFilter('europe').subscribe({
      next: (response) => {
        expect(response).toBe(true);
        expect(response).toHaveProperty('region');
      },
    });

    const req = httpTesting.expectOne(
      'restcountries.com/v3.1/region/europe?fields=flags,name,capital,region,population'
    );

    // req.flush({});

    expect(req.request.method).toBe('GET');
  });

  it('Should fetch incorrectly countries with unexistent filter', () => {
    countriesByFilterService
      .getCountriesByFilter('non existent filter')
      .subscribe({
        error(err: HttpErrorResponse) {
          expect(err.status).toBe(404);
        },
      });

    const req = httpTesting.expectOne({
      method: 'GET',
      url:
        COUNTRY_BY_REGION_FILTER_ENDPOINT +
        'non existent filter?fields=flags,name,capital,region,population',
    });

    expect(req.request.method).toBe('GET');
  });
});
