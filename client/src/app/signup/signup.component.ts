import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;
  isSubmitted  =  false;
  constructor(private router: Router, private formBuilder: FormBuilder, private userService: UserService) { }

  ngOnInit() {
    this.signupForm  =  this.formBuilder.group({
      firstname: [null, Validators.required],
      lastname: [null, Validators.required],
      email: [null, Validators.required],
      password: [null, Validators.required],
      confirm_password: [null, Validators.required]
   });
  }

  get formControls() { 
    return this.signupForm.controls; 
  }

  onSubmit(){
    console.log(this.signupForm.value);
    this.isSubmitted = true;
    // if(this.signupForm.invalid){
    //   console.log("AWWWWWWWW HEREEEEEEEEEEE");
    //   return;
    // }
    var newUser = {
      firstname: this.signupForm.value.firstname,
      lastname: this.signupForm.value.lastname,
      email: this.signupForm.value.email,
      password: this.signupForm.value.password
    };
    this.userService.signupUser(newUser);
    this.router.navigateByUrl('/login');
  }
  
}
