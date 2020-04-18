import {Injectable} from '@angular/core'
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';

@Injectable()
export class UserService{
    constructor(private http: HttpClient) { }

    getUsers() {
        return this.http.get('/users/all');
    }

    signupUser(user) {
        let headers = new HttpHeaders();
        console.log(user);
        headers.append('Content-Type', 'application/json');
        return this.http.post('/users/signup', user, {headers: headers, responseType:'json'})
        .subscribe();
    }

    getUserToLogin() {
        
    }
}
