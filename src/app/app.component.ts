import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';



@Component({ selector: 'app', templateUrl: 'app.component.html' },)
export class AppComponent implements OnInit {
  currentUser = {};
  constructor(
    private router: Router
  ) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'))
  }

  ngOnInit() {
    var path = window.location.pathname;
    var currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser && currentUser.userName) {
      if (path == '/login' || path== '/' || path ==  '/register') {
        this.router.navigate(['home']);
      } 

    } else {
      if(path=='/register'){

      }else if(path != '/login') {
        alert("Not logged in");
        this.router.navigate(['login']);
      }
    }

  }

  logout() {
    localStorage.removeItem('currentUser');
    this.router.navigate(['login']);
  }
}