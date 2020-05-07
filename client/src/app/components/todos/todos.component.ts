import { Component, OnInit } from '@angular/core';
import { TodoService } from '../../services/todo.service';
import { Task } from '../../models/Task';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
    selector: 'todos',
    templateUrl: './todos.component.html',
    styleUrls: ['./todos.component.css']
  })
  export class TodosComponent implements OnInit {
	title = 'List';
	selectedOption: string;
	addTodoForm: FormGroup;
	isSubmitted = false;
    todos: Task[];
    editMap: Map<Task, Boolean>;
    constructor(private _todoService: TodoService, private formBuilder: FormBuilder) { }

    ngOnInit(){
		this.editMap = new Map();
		this.addTodoForm  =  this.formBuilder.group({
			task: [null, Validators.required],
			priority: [null, Validators.required],
		});
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

	get formControls() { 
		return this.addTodoForm.controls; 
	}

	getColor(priority) {
		switch (priority) {
			case 'High':
				return '#dc3545';
			case 'Medium':
				return '#f8f9fa';
		  	case 'Low':
				return '#007bff';
		}
	  }

    addTodo(event, text, priority){
		this.isSubmitted = true;
		var result;
		console.log(priority.value);
		var newTask = {
			text: text.value,
			author: localStorage.getItem("token-name"),
			priority: priority.value,
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
			priority: task.priority,
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
			priority: task.priority,
			done: task.done
		};

		this._todoService.updateTodo(_task);
		}
    }
}