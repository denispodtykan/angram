import { Component, OnDestroy, OnInit } from '@angular/core';

//Services
import { UserService, CachedDataService, GlobalService } from '@services';

//Models
import { IUser } from '@models';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})

export class HomeComponent implements OnInit, OnDestroy {
	user: IUser;
	showSidebar: boolean = true;
	private ngUnsubscribe = new Subject<void>();

	constructor(
		private userService: UserService,
		private cachedDataService: CachedDataService,
		private globalService: GlobalService
	) {
		this.globalService.toggleSidebar$
			.pipe(takeUntil(this.ngUnsubscribe))
            .subscribe(value => {
				setTimeout(()=>{
					this.showSidebar = value;
				})
				
            });
	}

	ngOnInit() {
		this.getCurrentUser();
	}

	getCurrentUser(){
		this.user = this.cachedDataService.getUser();
	}

	logout(){
		this.userService.logout();
	}

	ngOnDestroy(): void {
		this.ngUnsubscribe.next();
		this.ngUnsubscribe.complete();
	}
}
