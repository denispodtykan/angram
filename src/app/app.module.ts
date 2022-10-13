import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ChatListComponent } from './view/components/chat-list/chat-list.component';
import { ChatItemComponent } from './view/components/chat-item/chat-item.component';
import { ChatHeaderComponent } from './view/components/chat-header/chat-header.component';
import { MessageContainerComponent } from './view/components/message-container/message-container.component';
import { MessageComponent } from './view/components/message/message.component';
import { SendMessageFormComponent } from './view/components/send-message-form/send-message-form.component';
import { HomeComponent } from './view/pages/home/home.component';
import { ChatComponent } from './view/pages/chat/chat.component';
import { SigninComponent } from './view/pages/signin/signin.component';
import { SignupComponent } from './view/pages/signup/signup.component';


//Guards 
import { AuthGuard } from './guards';


@NgModule({
	declarations: [
		AppComponent,
		ChatListComponent,
		ChatItemComponent,
		ChatHeaderComponent,
		MessageContainerComponent,
		MessageComponent,
		SendMessageFormComponent,
		HomeComponent,
		ChatComponent,
		SigninComponent,
		SignupComponent
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		FormsModule,
		ReactiveFormsModule
	],
	providers: [
		AuthGuard
	],
	bootstrap: [AppComponent]
})
export class AppModule { }
