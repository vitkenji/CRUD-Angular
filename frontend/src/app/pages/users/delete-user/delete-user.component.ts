import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { User } from '../../../models/user';
import { UserService } from '../../../services/user-service/user.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject } from '@angular/core';

@Component({
  selector: 'app-delete-user',
  imports: [],
  templateUrl: './delete-user.component.html',
  styleUrl: './delete-user.component.css'
})
export class DeleteUserComponent {
  constructor(public dialogRef: MatDialogRef<DeleteUserComponent>,
    @Inject(MAT_DIALOG_DATA) public user: User,
    private userService: UserService
  ) { }

  closeDialog() {
    this.dialogRef.close();
  }

  public async deleteUser(){
    await this.userService.DeleteUser(this.user.username);
    this.dialogRef.close('delete');
  }
}
