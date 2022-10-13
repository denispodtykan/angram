import { Component, Input } from '@angular/core';

//Services 
import { GlobalService } from '@services';

//Models
import { IChat } from '@models';


@Component({
	selector: 'app-chat-header',
	templateUrl: './chat-header.component.html'
	})
	
export class ChatHeaderComponent {
	@Input() chat: IChat;
	
	constructor(
		private globalService: GlobalService
	) { }

	showSideBar(){
		this.globalService.showSideBar();
	}
}
