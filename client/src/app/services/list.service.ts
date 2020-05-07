import {Injectable} from '@angular/core'
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';

@Injectable()
export class ListService{
    constructor(private http: HttpClient) { }
    
    getLists() {
		console.log("GETTING");
        return this.http.get('/lists/all');
    }

    createList(list) {
        let headers = new HttpHeaders();
        console.log(list);
        headers.append('Content-Type', 'application/json');
		return this.http.post('/lists/create', list, {headers: headers, responseType:'json'});
        // .subscribe();
    }

    deleteList(id) {
        // console.log(id);
        return this.http.delete('/lists/delete/'+id)
        .subscribe();
    }

    editList(list) {
        let headers = new HttpHeaders();
        // console.log(task);
        headers.append('Content-Type', 'application/json');
        return this.http.put('/lists/edit/'+list._id, list, {headers: headers, responseType:'json'})
        .subscribe();
    }
}
