// Authentication Service

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
	constructor() { }    
	logout() :void {    
	localStorage.setItem('isLoggedIn','false');
	localStorage.removeItem('currUser-id');
	localStorage.removeItem('currUser-email');
	localStorage.removeItem('currUser-name');
	}
}