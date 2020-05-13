// List Service

import {Injectable} from '@angular/core'
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';

@Injectable()
export class ListService{
    constructor(private http: HttpClient) { }
    
    getLists() {
        return this.http.get('/lists/all');
	}
	
	getSingleList(_id) {
		return this.http.get('/lists/currentlist/'+_id);
	}

	getUserLists(lists) {
		let headers = new HttpHeaders();
        headers.append('Content-Type', 'application/json');
        return this.http.put('/lists/userlists/', lists, {headers: headers, responseType:'json'});
	}

    createList(list) {
        let headers = new HttpHeaders();
        headers.append('Content-Type', 'application/json');
		return this.http.post('/lists/create', list, {headers: headers, responseType:'json'});
    }

    deleteList(id) {
        return this.http.delete('/lists/delete/'+id)
        .subscribe();
    }

    editList(list) {
        let headers = new HttpHeaders();
        headers.append('Content-Type', 'application/json');
        return this.http.put('/lists/edit/'+list._id, list, {headers: headers, responseType:'json'})
        .subscribe();
    }
}
