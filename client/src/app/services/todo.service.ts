// Todo Service

import {Injectable} from '@angular/core'
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';

@Injectable()
export class TodoService{
    constructor(private http: HttpClient) { }
    
    getTodos() {
        return this.http.get('/todos/getAll');
	}
	
	getSingleTodo(_id) {
		return this.http.get('/todos/getById/'+_id);
	}

	getTodoByList(tasks) {
		let headers = new HttpHeaders();
        headers.append('Content-Type', 'application/json');
		return this.http.put('/todos/listTodos', tasks, {headers: headers, responseType:'json'});
	}

    saveTodo(task) {
        let headers = new HttpHeaders();
        headers.append('Content-Type', 'application/json');
        return this.http.post('/todos/save', task, {headers: headers, responseType:'json'});
    }

    deleteTodo(id) {
        return this.http.delete('/todos/delete/'+id)
        .subscribe();
    }

    updateTodo(task) {
        let headers = new HttpHeaders();
        headers.append('Content-Type', 'application/json');
        return this.http.put('/todos/update/'+task._id, task, {headers: headers, responseType:'json'})
        .subscribe();
    }
}
