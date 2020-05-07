import { Component, OnInit } from '@angular/core';
import { ListService } from '../../services/list.service';
import { List } from '../../models/List';

@Component({
	selector: 'app-dashboard',
	templateUrl: './dashboard.component.html',
	styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
	lists: List[];
	listLength: number;
	error: boolean

	constructor(private _listService: ListService) { }

	ngOnInit() {
		this.lists = [];
		this.listLength = 0;
		this.error = false;
		this._listService.getLists()
		.subscribe(data => {
			for(let list in data) {
				this.lists.push(data[list]);
				this.listLength ++;
			}
		});
	}

	addList(listName) {
		this.error = false;
		this.error = this.lists.includes(listName.value);
		if(!this.error) {
			var newList = {
				name: listName.value,
				owner: localStorage.getItem("token-name"),
				members: [],
				tasks: []
			}
			// this.lists.push(listName.value);
		}
		var result = this._listService.createList(newList);
		// console.log(result);
		// console.log(this.listLength);
		result.subscribe(data => {
			console.log(data);
			// this.lists = data;
			console.log(data[this.listLength]);
			this.lists.push(data[this.listLength]);
			this.listLength ++;
		});
		listName.value="";
	}
}
