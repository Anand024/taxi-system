import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ActivatedRouteSnapshot, RouterStateSnapshot, CanDeactivate } from '@angular/router';

@Injectable()
export class CanDeactivateGuardService implements CanDeactivate<CanComponentDeactivate> {

  constructor() { }

  canDeactivate(component: CanComponentDeactivate,
  currentRoute: ActivatedRouteSnapshot,
  currentState: RouterStateSnapshot,
  nextState?: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return component.canDeactivate();
  }
}

export interface CanComponentDeactivate {
  canDeactivate: () => Observable<boolean> | Promise<boolean> | boolean;
}
