import { Component, Input, OnInit } from '@angular/core';
import { TodoService } from '../../services/todo.service';
import { Task } from '../../models/Task';
import { List } from '../../models/List';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ListService } from 'src/app/services/list.service';


@Component({
    selector: 'todos',
    templateUrl: './todos.component.html',
    styleUrls: ['./todos.component.css']
  })
  
  export class TodosComponent implements OnInit {

	@Input() mainList: List;

	selectedOption: string;
	addTodoForm: FormGroup;
	isSubmitted = false;
    todos: Task[];
    editMap: Map<Task, Boolean>;
	constructor(private _todoService: TodoService, private _listService: ListService, private formBuilder: FormBuilder) { }
	
    ngOnInit(){
		this.editMap = new Map();
		this.addTodoForm  =  this.formBuilder.group({
			task: [null, Validators.required],
			priority: [null, Validators.required],
		});
		this.todos = [];
		var currList:any = []; 
		
		this._todoService.getTodoByList(this.mainList.tasks)
		.subscribe(tasks => {
			currList = tasks;
			this.todos = this.todos = this.sortTasks(currList);;

		});
	}

	get formControls() { 
		return this.addTodoForm.controls; 
	}

	// Sort according to priorities
	sortTasks(tasks) {
		var temp;
		var ind = 0;
		const priorityList = ["High", "Medium"];
		for(let j in priorityList) {
			var start = ind;
			for(let i = start; i < tasks.length; i ++) {
				if(tasks[i].priority == priorityList[j]){
					if(ind != i) {
						temp = tasks[i];
						tasks.splice(i, 1);
						tasks.splice(ind, 0, temp);
					}
					ind ++;
				}
			}
		}
		return tasks;
	}

	getBorderColor(priority) {
		switch (priority) {
			case 'High':
				return '#dc3545';
			case 'Medium':
				return '#f8f9fa';
		  	case 'Low':
				return '#007bff';
		}
	  }

    addTodo(text, priority){
		this.isSubmitted = true;
		var result;
		if(!priority.value)
			return;
		var newTask = {
			text: text.value,
			author: localStorage.getItem("currUser-name"),
			list: this.mainList._id,
			priority: priority.value,
			done: false
		};
		result = this._todoService.saveTodo(newTask);
		result.subscribe(task => {
			this.todos.push(task);
			this.todos = this.sortTasks(this.todos);
			
			var newList = this.mainList;
			newList.tasks.push(task._id);
			this._listService.editList(newList);
		});
		text.value="";
    }


    removeTodo(task) {
		var todos = this.todos;
		var newList = this.mainList;
		this._todoService.deleteTodo(task._id);
		for(let i = 0; i < todos.length; i ++) {
			if(todos[i]._id == task._id){
				todos.splice(i,1);
				break;
			}
		}
		for(let i = 0; i < newList.tasks.length; i ++) {
			if(newList.tasks[i] == task._id){
				newList.tasks.splice(i,1);
				break;
			}
		}
		this._listService.editList(newList);
    }

    updateState(event, task){
		var _task = {
			_id:task._id,
			text: task.text,
			author: task.author,
			list: task.list,
			priority: task.priority,
			done: event.target.checked
		};
		task.done = !task.done;
		this._todoService.updateTodo(_task);
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
				list: task.list,
				priority: task.priority,
				done: task.done
			};
			this._todoService.updateTodo(_task);
		}
    }
}