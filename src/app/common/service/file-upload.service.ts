import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class FileUploadService {

  constructor(private httpClient: HttpClient) { }

  postFile(fileToUpload: File): Observable<boolean> {
    const endpoint = 'your-destination-url';
    const formData: FormData = new FormData();
    // pdf, png,
    formData.append('fileKey', fileToUpload, fileToUpload.name);
    return null;
    // return this.httpClient
    //   .post(endpoint, formData, { headers: yourHeadersConfig })
    //   .map(() => { return true; })
    //   .catch((e) => this.handleError(e));
}
}
