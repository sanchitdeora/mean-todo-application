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
	mainUser: User;

	constructor(private router: Router, private formBuilder: FormBuilder, private _userService: UserService, private authenticationService: AuthenticationService, private appComponent: AppComponent) { }

	ngOnInit() {
		this.returnUrl = '/dashboard';
		if(localStorage.getItem("isLoggedIn") == "true")
			this.router.navigate([this.returnUrl]);
		this.users = [];
		this.loginForm  =  this.formBuilder.group({
			email: [null, Validators.required],
			password: [null, Validators.required],
		});
  	}
	get formControls() { 
	  return this.loginForm.controls; 
	}

	onSubmit(){
		var currUser: any;
		this.isSubmitted = true;
		this._userService.checkCredentials(this.loginForm.value)
		.subscribe(result => {
			if(result) {
				this.emailLogin = true;
				this.passwordLogin = true;
				localStorage.setItem('isLoggedIn', "true");
				this._userService.getUserByEmail(this.loginForm.value.email)
				.subscribe(user => {
					currUser = user;
					localStorage.setItem('currUser-id', currUser._id);
					localStorage.setItem('currUser-email', currUser.email);
					localStorage.setItem('currUser-name', currUser.firstname+ " " + currUser.lastname);
					this.appComponent.updateProfileName(currUser.firstname, currUser.lastname);
					this.router.navigate([this.returnUrl]);
				});
			} else {
				this.emailLogin = false;
				this.passwordLogin = false;
			}
		});
  	}
}