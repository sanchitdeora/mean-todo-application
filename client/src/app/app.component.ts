import { Component } from '@angular/core';
import {TodoService} from './services/todo.service';
import { UserService } from './services/user.service';
import { User } from './User';
import {GlobalConstants} from './common/global.constants'

@Component({
  moduleId: 'module.id',
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [
    './app.component.css',
    '../../bower_components/bootstrap/dist/css/bootstrap.css'
 ],
 providers: [TodoService, UserService]
})
export class AppComponent {
  title = 'client';
  current = GlobalConstants.currentUser;
}
