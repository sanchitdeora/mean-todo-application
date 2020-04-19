import { Component, OnInit } from '@angular/core';
import {TodoService} from '../../services/todo.service';
import { Task } from '../../models/Task';

@Component({
    selector: 'todos',
    templateUrl: './todos.component.html',
    styleUrls: ['./todos.component.css']
  })
  export class TodosComponent implements OnInit {
    title = 'List';
    todos: Task[];
    editMap: Map<Task, Boolean>;
    constructor(private _todoService: TodoService) { }

    ngOnInit(){
		this.editMap = new Map();
		this.todos = [];
		var i = 0;
		this._todoService.getTodos()
		.subscribe(tasks => {
			for(let todo in tasks) {
				this.editMap.set(tasks[todo], false);
				this.todos.push(tasks[todo]);
			}
		});  
    }
    addTodo(event, text){
		var result;
		var newTask = {
			text: text.value,
			author: localStorage.getItem("token-name"),
			done: false
		};
		result = this._todoService.saveTodo(newTask);
		// console.log(result);
		result.subscribe(data => {
			this.todos = data;
		});
		text.value="";
    }

    removeTodo(event, task) {
		var todos = this.todos;
		this._todoService.deleteTodo(task._id);
		for(let i = 0; i < todos.length; i ++) {
			if(todos[i]._id == task._id)
				todos.splice(i,1);
		}
    }

    updateState(event, task){
		var _task = {
			_id:task._id,
			text: task.text,
			author: task.author,
			done: event.target.checked
		};
		task.done = !task.done;
		this._todoService.updateTodo(_task);
		// .subscribe(data => {task.done = !task.done;});
    }

    setEditState(task, state) {
    	this.editMap.set(task, state);
    }

    updateTodoText(event, task) {
		if(event.which == 13) {
		task.text = event.target.value;
		this.editMap.set(task, false);
		var _task = {
			_id: task._id,
			text: task.text,
			author: task.author,
			done: task.done
		};

		this._todoService.updateTodo(_task);
		}
    }
}