import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Headers, RequestOptions } from '@angular/http';

@Injectable()
export class FileUploadService {

  constructor(private httpClient: HttpClient) { }

  postFile(fileToUpload: File, userId: any, apiToken: any): Observable<boolean> {
    const endpoint = 'http://18.219.43.223:8080/taxi/common/uploadFile';
    const formData: FormData = new FormData();
    // const headers = new HttpHeaders();
    //     headers.append('Content-Type', 'application/json');
    //     const options = new RequestOptions({
    //         headers: headers
    //       });
    // const body = {
    //   userId: userId,
    //   name: fileToUpload.name,
    //   file: fileToUpload
    // };
    const headers = new HttpHeaders({'Content-Type': '*/*', 'api_key': apiToken});
    formData.append('fileKey', fileToUpload, fileToUpload[0].name);
    const body = {
      formVal: formData,
      userId: userId
    };
    return this.httpClient
      .post(endpoint, body, {headers: headers}).map(this.extractData).catch(this.handleError);
  }

  private extractData(res: Response) {
    const body = res.json();
    return body;
  }

  private handleError(error: Response | any) {
    let errMsg: string;
    if (error instanceof Response) {
        const body = error.json() || '';
        // const err = body.error || JSON.stringify(body);
        // errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
        errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }
}
