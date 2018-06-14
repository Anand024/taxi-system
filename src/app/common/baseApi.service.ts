import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

const HTTPS = 'https://';
const GET_DRIVER_BY_ID = '';
const POST_DRIVER_DATA = '';
const ADD_DRIVER_DATA  = '';


@Injectable()
export class BaseApiService {

    constructor() {}

    getDriverById(): string {
        return GET_DRIVER_BY_ID;
    }
}
