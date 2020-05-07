import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { User } from '../../models/User';
import { AuthenticationService } from '../../services/authentication.service';
import { AppComponent } from 'src/app/app.component';

@Component({
	selector: 'login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
	loginForm: FormGroup;
	returnUrl: string;  
	isSubmitted  =  false;
	users: User[];
	emailLogin: boolean;
	passwordLogin: boolean;

	constructor(private router: Router, private formBuilder: FormBuilder, private userService: UserService, private authenticationService: AuthenticationService, private appComponent: AppComponent) { }

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
		this.returnUrl = '/dashboard';  
		this.authenticationService.logout();
  	}
	get formControls() { 
	  return this.loginForm.controls; 
 	}

	onSubmit(){
		// console.log(this.loginForm.value);
		this.isSubmitted = true;
		// if (this.loginForm.invalid) {  
		// 	return;
		// }  
		for(let user in this.users) {
		// console.log(this.users[user]);
			if(this.loginForm.value.email == this.users[user].email) {
				this.emailLogin = true;
				if(this.loginForm.value.password == this.users[user].password) {
					this.passwordLogin = true;
					localStorage.setItem('isLoggedIn', "true");  
					localStorage.setItem('token-email', this.users[user].email);
					localStorage.setItem('token-name', this.users[user].firstname+" "+this.users[user].lastname);  
					this.appComponent.updateProfileName(this.users[user].firstname, this.users[user].lastname);
					this.router.navigate([this.returnUrl]);  
				} 
				else {
					this.emailLogin = false;
					// console.log("Incorrect Password");
				}
				break;
			} 
			else {
				this.passwordLogin = false;
				// console.log("Incorrect Email");
			}
    	}
  	}
}
