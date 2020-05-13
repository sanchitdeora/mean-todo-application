// User Service

import {Injectable} from '@angular/core'
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';

@Injectable()
export class UserService{
    constructor(private http: HttpClient) { }

    getUsers() {
        return this.http.get('/users/all');
    }

	getCurrentUser(_id) {
		return this.http.get('/users/userById/'+_id);
	}

	getUserByEmail(email) {
		return this.http.get('/users/userByEmail/'+email);
	}

    signupUser(user) {
        let headers = new HttpHeaders();
        headers.append('Content-Type', 'application/json');
        return this.http.post('/users/signup', user, {headers: headers, responseType:'json'})
        .subscribe();
	}
	
	checkCredentials(userinfo) {
		let headers = new HttpHeaders();
        headers.append('Content-Type', 'application/json');
        return this.http.put('/users/checkCredential/'+userinfo.email, userinfo, {headers: headers, responseType:'json'});
	}

    updateUsers(updatedUser) {
		let headers = new HttpHeaders();
        headers.append('Content-Type', 'application/json');
        return this.http.put('/users/currentuser/'+updatedUser._id, updatedUser, {headers: headers, responseType:'json'})
        .subscribe();
    }
}