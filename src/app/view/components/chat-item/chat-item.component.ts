import { Component, Input, OnInit } from '@angular/core';


//Services
import { CachedDataService, ChatService } from '@services';

//Models
import { IChat, IUser } from '@models';


@Component({
	selector: 'app-chat-item',
	templateUrl: './chat-item.component.html',
	styleUrls: ['./chat-item.component.scss']
})
export class ChatItemComponent implements OnInit {
	@Input() fromChatList: boolean = false;

	@Input() chat: IChat;

	chatName: string;
	user: IUser;
	
	constructor(
		private chatService: ChatService,
		private cachedDataService: CachedDataService
	) { }

	ngOnInit(): void {
		this.user = this.cachedDataService.getUser();
		this.getChatName();
	}
	getChatName(){
		this.chatName = this.chatService.getChatName(this.chat, this.user.id);
	}
}
