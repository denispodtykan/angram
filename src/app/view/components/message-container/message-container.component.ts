import { Component, OnInit, Input, OnDestroy, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { takeUntil } from 'rxjs/operators';

//Services
import { CachedDataService, MessageService } from '@services';

//Models
import { IChat, IMessage, IUser } from '@models';
import { Subject } from 'rxjs';

@Component({
	selector: 'app-message-container',
	templateUrl: './message-container.component.html'
})

export class MessageContainerComponent implements OnInit, OnDestroy, AfterViewInit {
	@Input() chat: IChat;
	user: IUser;
	messages: IMessage[];
	@ViewChild('messagesObj') private messagesElem: ElementRef;

	private ngUnsubscribe = new Subject<void>()

	constructor(
		private messageService: MessageService,
		private cachedDataService: CachedDataService
	) {
		this.messageService.updateMessage$
			.pipe(takeUntil(this.ngUnsubscribe))
            .subscribe(() => {
				this.getMessages();
            });
	}

	ngOnInit(): void {
		this.getMessages();
		this.getCurrentUser();
	}
	
	getCurrentUser(){
		this.user = this.cachedDataService.getUser();
	}

	getMessages(){
		console.log()
		this.messageService.getMessages(this.chat.id).subscribe(messages => {
			this.messages = messages;
			this.scrollToBottom();
		})
	}

	scrollToBottom(){
		try {
			setTimeout(()=>{
				if(this.messagesElem){
					this.messagesElem.nativeElement.scrollTop = this.messagesElem.nativeElement.scrollHeight;
				}
			},0)
			
		} catch (err) {}
	}
	ngAfterViewInit(): void {
		this.scrollToBottom();
	}

	ngOnDestroy(): void {
		this.ngUnsubscribe.next();
		this.ngUnsubscribe.complete();
	}
}
