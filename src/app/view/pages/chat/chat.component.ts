import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

//Models
import { IChat } from '@models';
import { ChatService, GlobalService } from '@services';

@Component({
    selector: 'app-chat',
    templateUrl: './chat.component.html'
})
export class ChatComponent implements OnInit {
	chat: IChat;
	
	constructor(
		private activeRoute: ActivatedRoute,
		private chatService: ChatService,
		private globalService: GlobalService
	) { }

	ngOnInit(): void {
		this.globalService.hideSideBar();

		this.activeRoute.params
			.subscribe(params => {
				this.getChat(params['id'])
			});
	}

	getChat(chatId: string){
		this.chat = this.chatService.getChat(chatId);
	}
}
