import { Component, Input } from '@angular/core';

//Models
import { IMessage } from '@models';

@Component({
	selector: 'app-message',
	templateUrl: './message.component.html'
})
export class MessageComponent {
	@Input() message: IMessage;
	
	constructor() { }
}
