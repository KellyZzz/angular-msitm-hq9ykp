import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { HProd } from '../models/HProd';
import { SProd } from '../models/SProd';
import { User } from '../models/User';
 
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable()
export class ConnectingToDatabaseService {
  private _http: Http;

  constructor(private http: Http) {
    this._http = http;
  }

  public getData(api?: string, page?: string) {
    if (!api) {
        api = `http://localhost:3000/api/HardwareProduct?_size=100`
    } 
    var n_api = api + page;
    return this._http.get(n_api);
  }

  private HprodUrl = `http://localhost:3000/api/HardwareProduct`;  // URL to web api

  public getHProd(id?: string) {
    const url = `${this.HprodUrl}/${id}`;
    return this._http.get(url);
  }

  public putData(api?: string, hprod?: HProd) {
      if (!api) {
          api = `http://localhost:3000/api/HardwareProduct`
      } 
      return this._http.post(api, hprod);
  }

  public getSoftData(api?: string) {
    if (!api) {
        api = `http://localhost:3000/api/SoftwareProduct?_size=100`
    } 
    return this._http.get(api);
  }

  public putSoftData(api?: string, hprod?: HProd) {
    if (!api) {
        api = `http://localhost:3000/api/SoftwareProduct`
    } 
    return this._http.post(api, hprod);
  }

  private SprodUrl = `http://localhost:3000/api/SoftwareProduct`;  // URL to web api

  public getSProd(id?: string) {
    const url = `${this.SprodUrl}/${id}`;
    return this._http.get(url);
  }

  public putUserData(api?: string, user?: User) {
      if (!api) {
          api = `http://localhost:3000/api/Users`
      } 
      return this._http.post(api, user);
  }

  public getUserData(api?: string) {
      if (!api) {
          api = `http://localhost:3000/api/Users`
      } 
      return this._http.get(api);
  }

  private UserUrl = `http://localhost:3000/api/Users?_size=100`;  // URL to web api
  public getUser(id?: string) {
    const url = `${this.UserUrl}`;
    return this._http.get(url);
  }
 
}