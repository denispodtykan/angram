import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

//Services
import { CachedDataService } from '@services';

@Injectable()

export class AuthGuard implements CanActivate{
    constructor(
        private cachedDataService: CachedDataService,
        private router: Router
    ){}

    canActivate(): boolean {
        if(!this.cachedDataService.getAuth()){
            this.router.navigate(['signin']);
            return false;
        }else{
            return true;
        }
    }
}