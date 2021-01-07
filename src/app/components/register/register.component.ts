import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';


@Component({ templateUrl: 'register.component.html' })
export class RegisterComponent implements OnInit {
    registerForm: FormGroup;
    loading = false;
    submitted = false;
  registrationDetails: any={};

    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
    ) {
        if (JSON.parse(localStorage.getItem('currentUser')) ){
            this.router.navigate(['/']);
        }
    }

    ngOnInit() {
        this.registerForm = this.formBuilder.group({
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            username: ['', Validators.required],
            password: ['', [Validators.required, Validators.minLength(6)]]
        });
    }

    get f() { return this.registerForm.controls; }

    onSubmit() {
      this.registrationDetails=this.registerForm.controls;
      if(this.userNameExist(this.registrationDetails.username.value)){
        alert("Username already exist");
        return;
      }

        if (this.registerForm.invalid) {
            return;
        }

       let userData=JSON.parse(localStorage.getItem('userData'));
       if(!userData){
         userData=[];
       }
       var user={
         firstName:this.registrationDetails.firstName.value,
         lastName:this.registrationDetails.lastName.value,
         userName:this.registrationDetails.username.value,
         password:this.registrationDetails.password.value
       }
       localStorage.setItem('currentUser',JSON.stringify(user));
       userData.push(user);
       localStorage.setItem('userData',JSON.stringify(userData));
      this.router.navigate(['/home']);               
    }

    userNameExist(userName){
      var users:any=JSON.parse(localStorage.getItem('userData'));
      if(!users){
        return false;
      }else{
        for(var i=0;i<users.length;i++){
          if(users[i].username==userName){
            return true;
          }
        }
      }
      return false;
    }
}
