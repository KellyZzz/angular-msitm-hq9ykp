import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { HProd } from '../models/HProd';
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
        api = `http://localhost:3000/api/HardwareProduct?_p=`
    } 
    var n_api = api + page;
    return this._http.get(n_api);
  }

  private HprodUrl = `http://localhost:3000/api/HardwareProduct`;  // URL to web api

  public getHProd(id?: string) {
    const url = `${this.HprodUrl}/${id}`;
    return this._http.get(url);
  }

  public getSoftData(api?: string) {
    if (!api) {
        api = `http://localhost:3000/api/SoftwareProduct?_size=100`
    } 
    return this._http.get(api);
  }

  public putData(api?: string, hprod?: HProd) {
      if (!api) {
          api = `http://localhost:3000/api/HardwareProduct`
      } 
      return this._http.post(api, hprod);
    }

    public putSoftData(api?: string, hprod?: HProd) {
      if (!api) {
          api = `http://localhost:3000/api/SoftwareProduct`
      } 
      return this._http.post(api, hprod);
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