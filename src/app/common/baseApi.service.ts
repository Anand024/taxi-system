import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

const HTTPS = 'https://';
const GET_DRIVER_BY_ID = '';
const POST_DRIVER_DATA = '';
const ADD_DRIVER_DATA  = '';
const baseURL = 'http://18.219.43.223:8080/taxi/';

@Injectable()
export class BaseApiService {

    constructor() {}
    getDriverById(): string {
        return GET_DRIVER_BY_ID;
    }

    public getUserInfo(): any {
        const userInfoJSON = sessionStorage.getItem('userData');
        return JSON.parse(userInfoJSON);
    }

    public getUserId(): any {
        const userInfoJSON = JSON.parse(sessionStorage.getItem('userData'));
        if (userInfoJSON) {
            return userInfoJSON.userId;
        }
    }

    public getApiToken(): any {
        const userInfoJSON = JSON.parse(sessionStorage.getItem('userData'));
        if (userInfoJSON) {
            return userInfoJSON.accessToken;
        }
    }
    getbaseUrl(): string {
        return baseURL;
    }
}
