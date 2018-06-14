import { Injectable } from '@angular/core';

@Injectable()
export class LoggingService {

    isUserLoggedIn = false;

    constructor() {}

    logStatusChange(status: string) {
        // api call to check authentication
        return this.isUserLoggedIn;
    }
}

