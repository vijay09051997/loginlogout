import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({ templateUrl: 'login.component.html' })
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) {
    if (JSON.parse(localStorage.getItem('currentUser'))) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

  }

  get f() { return this.loginForm.controls; }

  onSubmit() {
    if (this.loginForm.invalid) {
      return;
    }

    if (!this.isAuthenticUser(this.loginForm.controls.username.value, this.loginForm.controls.password.value)) {
      alert('username or password not found');
      return;
    }
    this.router.navigate(['/home']);

  }
  isAuthenticUser(userName, password) {
    var userData = JSON.parse(localStorage.getItem('userData'));
    if (userData && userData.length > 0) {
      for (var i = 0; i < userData.length; i++) {
        if (userData[i].password == password && userData[i].userName == userName) {
          localStorage.setItem('currentUser', JSON.stringify(userData[i]));
          return true;
        }
      }
      return false;

    }
    return false;
  }
}