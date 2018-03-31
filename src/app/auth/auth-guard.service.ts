import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, CanActivateChild, CanLoad, Route, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {UserService} from '../user.service';
import {JwtHelper} from 'angular2-jwt';

@Injectable()
export class AuthGuardService implements CanLoad, CanActivate, CanActivateChild {
  private jwtHelper: JwtHelper;
  redirectUrl: string;

  constructor(private router: Router, private userService: UserService) {
    this.jwtHelper = new JwtHelper();
  }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return undefined;
  }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    const url: string = state.url;
    return this.checkLogin(url);
  }
  canLoad(route: Route): Observable<boolean> | Promise<boolean> | boolean {
    if (this.isAdmin()) {
      return true;
    }

    this.redirectUrl = '/admin';
    this.router.navigateByUrl('/login');
    return false;
  }

  isAdmin() {
    const token = localStorage.getItem('token');
    if (token && !this.jwtHelper.isTokenExpired(token)) {
      console.log(this.jwtHelper.decodeToken(token));
      if (this.jwtHelper.decodeToken(token).sub.indexOf('admin') >= 0) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  checkLogin(url: string): boolean {
    const token = localStorage.getItem('token');

    if (token && !this.jwtHelper.isTokenExpired(token)) {
      return true;
    }

    this.redirectUrl = url;
    this.router.navigateByUrl('/login');
    return false;
  }
}
