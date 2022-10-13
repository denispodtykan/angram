import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './view/pages/home/home.component';
import { ChatComponent } from './view/pages/chat/chat.component';
import { SigninComponent } from './view/pages/signin/signin.component';
import { SignupComponent } from './view/pages/signup/signup.component';

//Guards
import { AuthGuard } from './guards';

const routes: Routes = [
	 
	{ 
		path: '', 
		pathMatch:'full',
		redirectTo:'chat'
	}, 
	{
		path: 'signin',
		component: SigninComponent,
	},
	{
		path: 'signup',
		component: SignupComponent,
	},
	{ 
		path: 'chat', 
		component: HomeComponent,
		canActivate: [AuthGuard],
		children: [
			{
			  path: ':id',
			  component: ChatComponent,
			  canActivate: [AuthGuard],
			},
		]
	}, 
	{ 
		path: '**', 
		redirectTo:'chat'
	}, 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
