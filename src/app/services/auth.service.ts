import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

@Injectable()
export class AuthService implements CanActivate {
    constructor(private router: Router) {
    }

    canActivate() {
        if (!localStorage.getItem('mws.token')) {
            this.router.navigate(['/']);
            return false;
        }

        // const data: any = JSON.parse(localStorage.getItem('mws.user'));
        // if (!data) {
        //     this.router.navigate(['/']);
        //     return false;
        // }

        return true;
    }
}
