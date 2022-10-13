import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

//Models
import { IChat, IMessage, IUser } from '@models';

//Data 
import { users } from '@data/users';
import { chats } from '@data/chats';
import { messages } from '@data/messages';


@Injectable({
  	providedIn: 'root'
})
export class CachedDataService {
	users: IUser[];
	allMessages: IMessage[] = messages;
	allChats: IChat[] = chats;
  	constructor() { }

	private currentUserSubject = new Subject<IUser>();
	currentUser$ = this.currentUserSubject.asObservable();

	private updateChatsSubject = new Subject<IChat[]>();
	updateChats$ = this.updateChatsSubject.asObservable();

	setUsers(users: IUser[]){
		if(!this.users){
			this.users = users;
		}
		localStorage.setItem("users", JSON.stringify(this.users));
	}

	getUsers(){
		if(localStorage.getItem("users")){
			let tempObj: any = JSON.parse(localStorage.getItem("users")  || '{}');
			this.users = (tempObj as IUser[]);
		}else if(!this.users){
			this.users = users;
		}
		
		return this.users;
	}

	getUser(): IUser{
		let tempObj: any = JSON.parse(localStorage.getItem("user")  || '{}');
		return (tempObj as IUser);
	}

	getAuth(): boolean{
		return !! localStorage.getItem("user")
	}

	setUser(user: IUser){
		this.currentUserSubject.next(user);
		
		localStorage.setItem("user", JSON.stringify(user));
	}

	setAllMessages(messages: IMessage[]){
		this.allMessages = messages;
		localStorage.setItem("messages", JSON.stringify(messages));
	}

	getAllMessages(){
		if(localStorage.getItem("messages")){
			let tempObj: any = JSON.parse(localStorage.getItem("messages")  || '{}');
			this.allMessages = (tempObj as IMessage[]);
		}
		return this.allMessages;
	}

	setAllChats(chats: IChat[]){
		this.allChats = chats;
		localStorage.setItem("chats", JSON.stringify(chats));
		this.updateChatsSubject.next(this.allChats);
	}

	getAllChats(){
		if(localStorage.getItem("chats")){
			let tempObj: any = JSON.parse(localStorage.getItem("chats")  || '{}');
			this.allChats = (tempObj as IChat[]);
		}
	
		return this.allChats;
	}
	
	clearUser(){
		localStorage.removeItem("user")
	}
}
