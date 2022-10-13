import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class GlobalService {
	private toggleSidebarSubject = new Subject<boolean>();
	toggleSidebar$ = this.toggleSidebarSubject.asObservable();
	
	constructor() { }

	hideSideBar(){
		this.toggleSidebarSubject.next(false);
	}
	showSideBar(){
		this.toggleSidebarSubject.next(true);
	}
}
