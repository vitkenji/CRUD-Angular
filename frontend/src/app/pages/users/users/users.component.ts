import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user-service/user.service';
import { User } from '../../../models/user';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-users',
  imports: [MatTableModule],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent implements OnInit {

  users: User[] = [];
  dataSource: MatTableDataSource<User> = new MatTableDataSource<User>();
  columnsToDisplay = ['username', 'name'];
  
  constructor(private userService : UserService) {}

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


  

}
