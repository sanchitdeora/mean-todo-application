import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs-compat/operator/map'; 

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
	constructor() { }    
	logout() :void {    
	localStorage.setItem('isLoggedIn','false');    
	localStorage.removeItem('token-email');
	localStorage.removeItem('token-name');
	}
}