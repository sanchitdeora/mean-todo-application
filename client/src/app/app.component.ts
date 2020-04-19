import { Component } from '@angular/core';
import {TodoService} from './services/todo.service';
import { UserService } from './services/user.service';
import { User } from './User';
import { AuthenticationService } from './services/authentication.service';

@Component({
	moduleId: 'module.id',
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: [
    	'./app.component.css',
    	'../../bower_components/bootstrap/dist/css/bootstrap.css'
 	],
 	providers: [TodoService, UserService]
})
export class AppComponent {
	title = 'client';
	constructor(private authenticationService: AuthenticationService) { }
  	logout(){
		this.authenticationService.logout();
	}
	printState(){
		console.log(localStorage.getItem('isLoggedIn'));
		console.log(localStorage.getItem('token'));
	}
}
