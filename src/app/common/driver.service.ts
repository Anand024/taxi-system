import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class DriverService {

  constructor(private http: Http) { }

  // loadDriveData
  loadAllDriverData(): Observable<any> {
    const requestURL  =  '';
            return this.http.get(requestURL, {
              withCredentials: true,
              headers: new Headers({
                'Content-Type': 'application/json'
              })
            }).map(this.extractData)
              .catch(this.handleError);
  }

  loadDriverDataById(driverId: string): Observable<any> {
            const requestURL  =  '';
            const qParams = { 'driverId': driverId };
            return this.http.get(requestURL, {
              withCredentials: true,
              params: qParams,
              headers: new Headers({
                'Content-Type': 'application/json'
              })
            }).map(this.extractData)
              .catch(this.handleError);
  }
  //editDriver

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
