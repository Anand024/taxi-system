import { Injectable } from '@angular/core';
import { Headers, Http, Response, URLSearchParams} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { AddDriverDataModel } from '../driver/model/driverData.model';

@Injectable()
export class DriverService {

  private qparams: URLSearchParams = new URLSearchParams();

  constructor(private http: Http) { }

  // loadDriveData
  loadAllDriverData(userId, apiToken): Observable<any> {
      const requestURL  =  'http://18.219.43.223:8080/taxi/driver/list';
      this.qparams.set('userId', userId);
            return this.http.get(requestURL, {
              withCredentials: true,
              headers: new Headers({
                'Content-Type': 'application/json',
                'api_key': apiToken
              }),
              search: this.qparams}).map(this.extractData)
              .catch(this.handleError);
  }

  loadDriverDataById(driverId: string, userId: string, apiToken: any): Observable<any> {
            const requestURL  =  'http://18.219.43.223:8080/taxi/driver/details';
            // const qParams = { 'id': driverId, 'userId': userId};
            this.qparams.set('id', driverId);
            this.qparams.set('userId', userId);
            return this.http.get(requestURL, {
              withCredentials: true,
              headers: new Headers({
                'Content-Type': 'application/json',
                'api_key': apiToken
              }),
              search: this.qparams}).map(this.extractData)
              .catch(this.handleError);
  }

  deleteDriver(driverId: string, userId: string, apiToken: any): Observable<any> {
    const requestURL  =  'http://18.219.43.223:8080/taxi/driver/delete';
    this.qparams.set('id', driverId);
    this.qparams.set('userId', userId);
    return this.http.delete(requestURL, {
      withCredentials: true,
      headers: new Headers({
        'Content-Type': 'application/json',
        'api_key': apiToken
      }),
      search: this.qparams}).map(this.extractData)
      .catch(this.handleError);
  }
  loadState(userId: any, apiToken: any): Observable<any> {
    const userIdVal = userId;
    const requestURL  =  'http://18.219.43.223:8080/taxi/common/stateList';
    this.qparams.set('userId', userIdVal);
    return this.http.get(requestURL,
      { withCredentials: true, headers: new Headers({
        'Content-Type': 'application/json',
        'api_key': apiToken }),
        search: this.qparams }).map(this.extractData).catch(this.handleError);
  }

  loadCabData(userId: any, apiToken: any): Observable<any> {
    const userIdVal = userId;
    const requestURL  =  'http://18.219.43.223:8080/taxi/common/cabsList';
    this.qparams.set('userId', userIdVal);
    return this.http.get(requestURL,
      { withCredentials: true, headers: new Headers({
        'Content-Type': 'application/json',
        'api_key': apiToken }),
        search: this.qparams }).map(this.extractData).catch(this.handleError);
  }
  saveDriverData(userId: any, driverData: any, apiToken: any): Observable<any> {
    const requestURL  =  'http://18.219.43.223:8080/taxi/driver/add';
    this.qparams.set('userId', userId);
    return this.http.post(requestURL, driverData,
      { withCredentials: true, headers: new Headers({
        'Content-Type': 'application/json',
        'api_key': apiToken }),
        search: this.qparams }).map(this.extractData).catch(this.handleError);
  }

  updateDriverData(userId: any, driverData: any, apiToken: any): Observable<any> {
    const requestURL  =  'http://18.219.43.223:8080/taxi/driver/update';
    this.qparams.set('userId', userId);
    return this.http.post(requestURL, driverData,
      { withCredentials: true, headers: new Headers({
        'Content-Type': 'application/json',
        'api_key': apiToken }),
        search: this.qparams }).map(this.extractData).catch(this.handleError);
  }

  loadCity(userId: any, apiToken: any): Observable<any> {
    const userIdVal = userId;
    const requestURL  =  'http://18.219.43.223:8080/taxi/common/cityList';
    this.qparams.set('userId', userIdVal);
    return this.http.get(requestURL,
      { withCredentials: true, headers: new Headers({
        'Content-Type': 'application/json',
        'api_key': apiToken }),
        search: this.qparams }).map(this.extractData).catch(this.handleError);
  }

  loadCountry(userId: any, apiToken: any): Observable<any> {
    const userIdVal = userId;
    const requestURL  =  'http://18.219.43.223:8080/taxi/common/countryList';
    this.qparams.set('userId', userIdVal);
    return this.http.get(requestURL,
      { withCredentials: true, headers: new Headers({
        'Content-Type': 'application/json',
        'api_key': apiToken }),
        search: this.qparams }).map(this.extractData).catch(this.handleError);
  }

  // getCountryAndCity(userId: any, apiToken: any): Observable<any> {
  //   let result = {
  //     'country': [],
  //     'city': []
  //   };

  //   const requestCountryURL  =  'http://18.219.43.223:8080/taxi/common/countryList';
  //   const userIdVal = userId;
  //   return;
  // }

  private extractData(res: Response) {
    const body = res.json();
    return body ? (body.data || body) : body;
  }

  private handleError(error: Response | any) {
    let errMsg: string;
    if (error instanceof Response) {
        const body = error.json() || '';
        const err = body.error || JSON.stringify(body);
        errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
        errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }
}
