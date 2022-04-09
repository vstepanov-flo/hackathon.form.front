import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { ApiService } from './api.service';

export interface CitiesInfo {
  [k: string]: OrganizationInfo[];
}

export interface CityInfo {
  city: string;
  organizations: OrganizationInfo[];
}

export interface OrganizationInfo {
  address: string;
  fullName: string;
  type: string;
}

@Injectable({
  providedIn: 'root'
})
export class OrganizationCacheService {

  private citiesInfoCache: CitiesInfo;
  private cities: string[] = [];

  constructor(
    private apiService: ApiService,
  ) { }

  public getOrganizationsByCity(city: string): string[] {
     return this.citiesInfoCache[city].map((organization) => {
       return `${organization.fullName} ${organization.address}`
     })
  }

  public getCities(): string[] {
    return this.cities;
  }

  public async setOrganizationsCitiesInfo(): Promise<void> {
    if (this.citiesInfoCache) {
      return;
    }
    const citiesInfo: CityInfo[] = await lastValueFrom(this.apiService.getCitiesInfo());
    this.citiesInfoCache = {};
    citiesInfo.forEach((cityInfo) => {
      this.citiesInfoCache[cityInfo.city] = cityInfo.organizations;
      this.cities.push(cityInfo.city);
    })
  }
}
