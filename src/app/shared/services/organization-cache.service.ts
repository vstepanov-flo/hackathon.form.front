import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { ApiService } from './api.service';

export interface Cities {
  [k: string]: Organization[];
}

export interface City {
  city: string;
  organizations: Organization[];
}

export interface Organization {
  address: string;
  fullName: string;
  type: string;
  organizationId: number;
}

@Injectable({
  providedIn: 'root'
})
export class OrganizationCacheService {

  private citiesInfoCache: Cities;
  private cities: string[] = [];

  constructor(
    private apiService: ApiService,
  ) { }

  public getOrganizationsByCity(city: string): string[] {
     return this.citiesInfoCache[city].map((organization) => {
       return `${organization.fullName} ${organization.address}`
     })
  }

  public getOrganizationId(city: string, organization: string): number {
    return this.citiesInfoCache[city].find((cityInfo) => {
      return `${cityInfo.fullName} ${cityInfo.address}` === organization;
    })!.organizationId
  }

  public getCities(): string[] {
    return this.cities;
  }

  public async setOrganizationsCitiesInfo(): Promise<void> {
    if (this.citiesInfoCache) {
      return;
    }
    const citiesInfo: City[] = await lastValueFrom(this.apiService.getCitiesInfo());
    this.citiesInfoCache = {};
    citiesInfo.forEach((cityInfo) => {
      this.citiesInfoCache[cityInfo.city] = cityInfo.organizations;
      this.cities.push(cityInfo.city);
    })
  }
}
