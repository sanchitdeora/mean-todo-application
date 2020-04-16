import {Injectable} from '@angular/core'
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';

@Injectable()
export class TodoService{
    constructor(private http: HttpClient) {

    }
    getTodos() {
        return this.http.get('/api/v1/todos');
    }

    saveTodo(task) {
        let headers = new HttpHeaders();
        // console.log(task);
        headers.append('Content-Type', 'application/json');
        return this.http.post('/api/v1/todo', task, {headers: headers, responseType:'json'});
        // .subscribe();
    }

    deleteTodo(id) {
        // console.log(id);
        return this.http.delete('/api/v1/todos/'+id);
    }

    updateTodo(task) {
        let headers = new HttpHeaders();
        // console.log(task);
        headers.append('Content-Type', 'application/json');
        return this.http.put('/api/v1/todo/'+task._id, task, {headers: headers, responseType:'json'})
        .subscribe();
    }
}
