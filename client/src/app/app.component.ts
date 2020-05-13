import { Component, OnInit } from '@angular/core';
import { TodoService } from './services/todo.service';
import { UserService } from './services/user.service';
import { User } from './models/User';
import { AuthenticationService } from './services/authentication.service';
import { ListService } from './services/list.service';

@Component({
	moduleId: 'module.id',
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: [
    	'./app.component.css',
		'../../bower_components/bootstrap/dist/css/bootstrap.css',
		'../../bower_components/glyphicons-only-bootstrap/css/bootstrap.min.css'
 	],
 	providers: [TodoService, UserService, ListService]
})
export class AppComponent {
	title = 'client';
	isLoggedIn: boolean;
	currentName: string;
	constructor(private authenticationService: AuthenticationService) { }
	
	ngOnInit(){
		this.currentName = "";
		this.isLoggedIn = localStorage.getItem('isLoggedIn') == 'false'? false : true;
	}

	set loggedIn(status) {
		this.isLoggedIn = status;
	}

	get userName(): any {
		return localStorage.getItem('currUser-name');
	}
	
	get loginCheck(): any {
		return localStorage.getItem('isLoggedIn');
	}

	updateProfileName(fname, lname) {
		if(localStorage.getItem('isLoggedIn') == 'true')
			this.currentName = fname+" "+lname;
	}

  	logout(){
		this.isLoggedIn = false;
		this.authenticationService.logout();
	}
}
