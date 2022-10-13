import { Component, OnInit, Input } from '@angular/core';

//Services
import { CachedDataService, MessageService } from '@services';

//Models
import { IChat, IMessage, IUser } from '@models';


@Component({
	selector: 'app-send-message-form',
	templateUrl: './send-message-form.component.html'
})
export class SendMessageFormComponent implements OnInit {
	user: IUser;
	@Input() chat: IChat;
	message: string;

	constructor(
		private cachedDataService: CachedDataService,
		private messageService: MessageService
	) { }

	ngOnInit(): void {
		this.getCurrentUser();
	}

	getCurrentUser(){
		this.user = this.cachedDataService.getUser();
	}

	send() {
		if(!this.message){
			return;
		}
		let message: IMessage = this.messageService.generateMessage(this.message, this.chat.id, this.user.id);
		this.messageService.sendMessage(message);
		this.message = "";
	}
}
