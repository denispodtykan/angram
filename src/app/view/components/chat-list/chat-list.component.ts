import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';

//Services
import {ChatService, CachedDataService, GlobalService } from '@services';

//Models
import { IChat, IUser } from '@models';


@Component({
  selector: 'app-chat-list',
  templateUrl: './chat-list.component.html'
})

export class ChatListComponent implements OnInit, OnDestroy {

	user: IUser;
	chats: IChat[];
	private ngUnsubscribe = new Subject<void>();
	
	constructor(
		private chatService: ChatService,
		private cachedDataService: CachedDataService,
		private globalService: GlobalService
	) {
		this.cachedDataService.updateChats$
			.pipe(takeUntil(this.ngUnsubscribe))
            .subscribe(chats => {
				this.chats = chats;
            });
	}

	ngOnInit() {
		this.getCurrentUser();
		this.getUserChats();
	}

	getCurrentUser(){
		this.user = this.cachedDataService.getUser();
	}

	hideSidebar(){
		this.globalService.hideSideBar();
	}
	
	getUserChats(){
		this.chats = this.chatService.getUserChats(this.user.id);
	}

	ngOnDestroy(): void {
		this.ngUnsubscribe.next();
		this.ngUnsubscribe.complete();
	}

}
