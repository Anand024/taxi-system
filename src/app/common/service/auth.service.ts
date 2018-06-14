import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';


@Injectable()
export class AuthService {

    isUserLoggedIn = false;
    token: any[] = [{
        tokenId: 'HYKKDDR567NNKKKVVFD',
        msg: 'success'
    }]; // Api token return after login success

    constructor(private http: Http) {}

    checkLoginSuccess(email: string, password: string): Observable<any> {
        return Observable.of(this.token).map(o => {
            this.isUserLoggedIn = true;
            sessionStorage.setItem('authSuccess', this.token[0].tokenId);
            JSON.stringify(o);
        });
    }

    getMockResponse() {
        return this.isUserLoggedIn;
    }
}

