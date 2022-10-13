import { Injectable } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';

//Models
import { IMessage } from '@models';

//Data

import { CachedDataService } from './cached-data.service';




@Injectable({
  	providedIn: 'root'
})
export class MessageService {
	messages: IMessage[];

	private updateMessageSubject = new Subject<IMessage>();
	updateMessage$ = this.updateMessageSubject.asObservable();

  	constructor(
		private cachedDataService: CachedDataService
	) { 
		this.messages = this.cachedDataService.getAllMessages();
	}

	getMessages(chatId: string): Observable<IMessage[]> {
		
		return of(this.messages.filter(message => message.chatId == chatId));
	}
	generateMessage(message: string, chatId: string, userId: string): IMessage{
		return {
			id: String(new Date().getTime()),
			chatId: chatId,
			date: new Date().getTime(),
			text: message,
			creatorId: userId
		}
	}

	sendMessage(message: IMessage){
		this.messages.push(message);

		this.cachedDataService.setAllMessages(this.messages);

		this.updateMessageSubject.next(message)
	}

	
}
