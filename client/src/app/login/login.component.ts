import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { User } from '../User';
import { GlobalConstants } from '../common/global.constants';

@Component({
	selector: 'login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
	loginForm: FormGroup;
	isSubmitted  =  false;
	users: User[];
	emailLogin: boolean;
	passwordLogin: boolean;

	constructor(private router: Router, private formBuilder: FormBuilder, private userService: UserService) { }

	ngOnInit() {
		this.users = [];
		this.emailLogin = true;
		this.passwordLogin = true;
		this.loginForm  =  this.formBuilder.group({
			email: [null, Validators.required],
			password: [null, Validators.required],
		});
		this.userService.getUsers()
		.subscribe(userList => {
			for(let user in userList) {
				// console.log(userList[user]);
				this.users.push(userList[user]);
			}
		});
  	}
	get formControls() { 
	  return this.loginForm.controls; 
 	}

	onSubmit(){
		console.log(this.loginForm.value);
		this.isSubmitted = true;
		console.log("LOG IN Check");
		for(let user in this.users) {
		// console.log(this.users[user]);
			if(this.loginForm.value.email == this.users[user].email) {
				this.emailLogin = true;
				if(this.loginForm.value.password == this.users[user].password) {
					this.passwordLogin = true;
					GlobalConstants.currentUser = this.users[user];
					this.router.navigateByUrl('/todos');
				} 
				else {
					this.emailLogin = false;
					console.log("Incorrect Password");
				}
				break;
			} 
			else {
				this.passwordLogin = false;
				console.log("Incorrect Email");
			}
    	}
  	}
}
