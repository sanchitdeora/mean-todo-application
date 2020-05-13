import { Component, OnInit, ViewChild, ViewContainerRef, ComponentFactoryResolver } from '@angular/core';
import { ListService } from '../../services/list.service';
import { List } from '../../models/List';
import { TodosComponent } from '../todos/todos.component';
import { UserService } from 'src/app/services/user.service';
import { RouteConfigLoadStart } from '@angular/router';
import { TodoService } from 'src/app/services/todo.service';

@Component({
	selector: 'app-dashboard',
	templateUrl: './dashboard.component.html',
	styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

	@ViewChild('todoContainer', { read: ViewContainerRef }) entry: ViewContainerRef;

	lists: List[];
	error: boolean;
	dashboardDisplay: boolean;
	editMap: Map<List, Boolean>;
	optionsMap: Map<List, Boolean>;
	inviteDisplay: boolean;
	mainList: List;

	constructor(private resolver: ComponentFactoryResolver, private _listService: ListService, private _userService: UserService, private _todoService: TodoService) { }

	ngOnInit() {
		this.inviteDisplay = false;
		this.lists = [];
		this.error = false;
		this.editMap = new Map();
		this.optionsMap = new Map();
		this.dashboardDisplay = true;
		var curr;
		var currList;
		this._userService.getCurrentUser(localStorage.getItem("currUser-id"))
		.subscribe(currentUser => {
			curr = currentUser;
			this._listService.getUserLists(curr.lists)
			.subscribe(lists => {
				currList = lists;
				for(let i = 0; i < currList.length; i ++) {
					// console.log(currList[i]);
					this.editMap.set(currList[i], false);
					this.optionsMap.set(currList[i], false);
					this.lists.push(currList[i]);
				}
			});
		});
	}

	createComponent(list) {
		this.mainList = list;
		this.dashboardDisplay = false;
		this.entry.clear();
		const factory = this.resolver.resolveComponentFactory(TodosComponent);
		const componentRef = this.entry.createComponent(factory);
		componentRef.instance.mainList = list;
	}
 
	toggleBack() {
		this.dashboardDisplay = true;
	}

	toggleInvite() {
		this.inviteDisplay = true;
	}

	getBGColor() {
		const colors = ["#007bff","#6610f2","#6f42c1","#e83e8c","#dc3545","#fd7e14","#ffc107","#28a745","#20c997","#17a2b8","#343a40","#868e96"];
		return colors[Math.floor(Math.random() * 12)];
	}

	checkDuplicateName(name): boolean {
		var lists = this.lists;
		// console.log("Current: "+name);
		for(let i = 0; i < lists.length; i ++) {
			if(lists[i].name == name) {
				return true;
			}
		}
		return false;
	}

	addList(listName) {
		this.error = false;
		this.error = this.checkDuplicateName(listName.value);
		if(this.error) {
			return;
		}
		var newList = {
			name: listName.value,
			owner: localStorage.getItem("currUser-id"),
			members: [],
			tasks: []
		}
		var result = this._listService.createList(newList);
		var addedList;
		var currListID;
		result.subscribe(data => {
			addedList = data;
			this.lists.push(addedList);
			currListID = addedList._id;
			var currUser; 
			this._userService.getCurrentUser(localStorage.getItem("currUser-id"))
			.subscribe(currentUser => {
				currUser = currentUser;
				currUser.lists.push(currListID);
				// console.log(curr.lists);
				this._userService.updateUsers(currUser);
			});
		});
		listName.value="";
	}

	deleteList(list) {
		var lists = this.lists;
		var curr;
		if(localStorage.getItem("currUser-id") != list.owner)
			return;	
		
		this._listService.deleteList(list._id);
		for(let i = 0; i < lists.length; i ++) {
			if(lists[i]._id == list._id) {
				lists.splice(i,1);
			}
		}

		for(let i = 0; i < list.tasks.length; i ++) {
			this._todoService.deleteTodo(list.tasks[i]);
		}

		// console.log(lists);
		this._userService.getCurrentUser(localStorage.getItem("currUser-id"))
		.subscribe(user => {
			// console.log(user);
			curr = user;
			for(let i = 0; i < curr.lists.length; i ++) {
				if(curr.lists[i] == list._id){
					curr.lists.splice(i, 1);
					break;
				}
			}
			// console.log(curr);
			this._userService.updateUsers(curr);
		});
	}

	setEditState(list, state) {
		this.editMap.set(list, state);
	}

	toggleOptionsState(list) {
		this.optionsMap.set(list, !this.optionsMap.get(list));
	}

	editListText(event, list) {
		if(event.which != 13)
			return;
		this.toggleOptionsState(list);
		this.setEditState(list, false);
		if(event.target.value < 1)
			return;
		// console.log("EDIT");
		// console.log(event.target.value);
		list.name = event.target.value;
		// console.log(list);
		this._listService.editList(list);
	}

	inviteUser(email) {
		var emailaddr = email.value.toLowerCase();
		var invitedUser: any;
		var listExistFlag = false;
		var memberExistFlag = false;
		// console.log(emailaddr);
		// console.log(this.mainList);
		if(localStorage.getItem("currUser-id") != this.mainList.owner){
			email.value="";
			return;
		}
		this._userService.getUserByEmail(emailaddr)
		.subscribe(user => {
			if(user != null){
				invitedUser = user;
				// console.log(user);
				// console.log(invitedUser);
				for(let i = 0; i < invitedUser.lists.length; i ++) {
					if(this.mainList._id == invitedUser.lists[i]) {
						listExistFlag = true;
						break;
					}
				}
				for(let i = 0; i < this.mainList.members.length; i ++) {
					if(this.mainList.members[i] == invitedUser._id) {
						memberExistFlag = true;
						break;
					}
				}
				if(!listExistFlag) {
					invitedUser.lists.push(this.mainList._id);
					this._userService.updateUsers(invitedUser);
				}
				if(!memberExistFlag) {
					this.mainList.members.push(invitedUser._id);
					this._listService.editList(this.mainList);
				}
			}
		});
		email.value="";
		this.inviteDisplay = false;
	}
}