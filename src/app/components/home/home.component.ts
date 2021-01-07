import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';


@Component({ templateUrl: 'home.component.html' })
export class HomeComponent implements OnInit {
  currentUser: any = {};
  users = [];
  filterUser:any = [];

  constructor(
    private UserService: UserService,
    private router:Router



  ) {
  }

  ngOnInit() {

    this.currentUser =localStorage.getItem('currentUser')? JSON.parse(localStorage.getItem('currentUser')):{};

    this.loadData();


  }

  logOut() {
    localStorage.removeItem('currentUser');
    this.router.navigate(['login']);
    
  }
  loadData() {
    this.UserService.getPost().subscribe(data => {
      console.log(data);
      this.users = data;
      this.filterUser = data;

    });
  }
  searchFilter(event) {
    console.log(event.target.value);
    if (!event.target.value) {
      this.filterUser = this.users;
    } else {
      this.filterUser = this.filterUser.filter(data => {
        return data.title.includes(event.target.value);
      });
    }


  }
}