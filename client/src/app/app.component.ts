import { Component } from '@angular/core';
import {TodoService} from './services/todo.service';

@Component({
  moduleId: 'module.id',
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [
    './app.component.css',
    '../../bower_components/bootstrap/dist/css/bootstrap.css'
 ],
 providers: [TodoService]
})
export class AppComponent {
  title = 'client';
}
