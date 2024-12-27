import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user-service/user.service';
import { User } from '../../../models/user';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';

@Component({
  selector: 'app-users',
  imports: [MatTableModule, MatButtonModule],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent implements OnInit {

  users: User[] = [];
  dataSource: MatTableDataSource<User> = new MatTableDataSource<User>();
  columnsToDisplay = ['username', 'name', 'edit', 'delete'];
  
  constructor(private userService : UserService, private router : Router) {}

  ngOnInit(): void {
    this.loadUsers();
  }
  
  async loadUsers(){
    var response = await this.userService.GetUsers();
    if(response != undefined) {
      this.users = response;
      this.dataSource.data = response;
    }
  }

  public navigateTo(route: string, append?: number) {
    var path = route;
    if(append != null){
      path = path + `/${append}`;
    }

    this.router.navigate([path]);
  }

}