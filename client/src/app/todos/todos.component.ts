import { Component, OnInit } from '@angular/core';
import {TodoService} from '../services/todo.service';
import { Task } from '../Task';

@Component({
  selector: 'todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})
export class TodosComponent implements OnInit {
  todos: Task[];
  t1: Task;
  editMode: boolean;
  m1: Map<Task, Boolean>;
  constructor(private _todoService: TodoService) { }

  ngOnInit(){
    this.m1 = new Map();
    this.todos = [];
    this.editMode = false;
    var i = 0;
    this._todoService.getTodos()
      .subscribe(tasks => {
        for(let todo in tasks) {
          this.m1.set(tasks[i], false);
          this.t1 = tasks[i];
          this.todos.push(tasks[i++]);
        }
        // console.log(this.m1.get(this.t1));
        // this.m1.set(this.t1, true)
        // console.log(this.m1.get(this.t1));
        // console.log(this.t1);
        // console.log(this.m1);
      });  
  }
  addTodo(event, text){
    var result;
    var newTask = {
      text: text.value,
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
      done: event.target.checked
    };

    this._todoService.updateTodo(_task);
    // .subscribe(data => {task.done = !task.done;});
  }

  setEditState(task, state) {
    this.m1.set(task, state);
  }

  updateTodoText(event, task) {
    if(event.which == 13) {
      task.text = event.target.value;
      this.m1.set(task, false);
      var _task = {
        _id: task._id,
        text: task.text,
        done: task.done
      };

      this._todoService.updateTodo(_task);
    }
  }

}