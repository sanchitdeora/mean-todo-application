import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../User';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs-compat/operator/map';
import { ILogin } from 'src/app/interfaces/login';   

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
	constructor() { }    
	logout() :void {    
	localStorage.setItem('isLoggedIn','false');    
	localStorage.removeItem('token');  
	}
}
