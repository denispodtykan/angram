import { Injectable } from '@angular/core';

//Services
import { CachedDataService } from '@services';
import { Router } from '@angular/router';

//Models
import { IUser } from '@models';

//Data 
import { users } from '@data/users';


@Injectable({
  	providedIn: 'root'
})
export class UserService {
	public users: IUser[] = users;

  	constructor(
		private cachedDataService: CachedDataService,
		private router: Router
	) { }

	signIn(user: IUser): boolean{
		const currentUser = this.cachedDataService
							.getUsers()
							.filter(u => u.username == user.username && u.password == user.password)
							[0];
			
		if(currentUser){
			this.cachedDataService.setUser(currentUser);
		}
		
		return !!currentUser;	
	}

	signUp(username: string, password: string){
		if(this.users.filter(user=>user.username == username).length){
			return false
		}else{
			let user  = this.generateUser(username, password);
			this.users.push(user);
			this.cachedDataService.setUser(user);
			return true;
		}
	}

	logout(){
		this.cachedDataService.clearUser();
		this.router.navigate(['/signin']);
	}

	generateUser(username: string, password: string): IUser{
		//TODO: Remove this method after add REST API
		return {
			id: String(new Date().getTime()),
			username: username,
			password: password,
		}
	}
}
