import { Injectable } from '@angular/core';

//Services
import { CachedDataService } from '@services';

//Models
import { IChat } from '@models';


@Injectable({
  	providedIn: 'root'
})
export class ChatService {
	chats: IChat[];
  	constructor(
		private cachedDataService: CachedDataService
	) {
		this.chats = this.cachedDataService.getAllChats();
	 }

	getUserChats(userId: string): IChat[]{
		let userChat: IChat[] = [];
		this.chats.forEach(chat=>{
			if(chat.members.filter(user=>user.id === userId).length){
				userChat.push(chat);
			}
		})

		return userChat;
	}

	getChat(chatId: string): IChat{
		return this.chats.filter(chat => chat.id == chatId)[0];
	}

	getChatName(chat: IChat, userId: string): string{
		if(chat.name){
			return chat.name;
		} else {
			return chat.members.filter(member=> member.id != userId)[0].username;
		}
	};	
}
