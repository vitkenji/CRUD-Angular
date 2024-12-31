import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { UserService } from '../../../services/user-service/user.service';
import { FormGroup } from '@angular/forms';
import { FormControl, Validators } from '@angular/forms';
import { UserDTO } from '../../../models/DTO/userDTO';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { CommonModule } from '@angular/common';
import { ToastService } from '../../../services/toast-service/toast.service';

@Component({
  selector: 'app-create-user',
  imports: [
     ReactiveFormsModule,
      MatFormFieldModule,
      MatInputModule,
      MatButtonModule,
      MatCheckboxModule,
      CommonModule
    ],
  templateUrl: './create-user.component.html',
  styleUrl: './create-user.component.css'
})
export class CreateUserComponent {
  constructor(private router : Router, private userService : UserService, private toastService : ToastService){}

  userForm = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]),
    name: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(50)]),
    password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]),
    confirmPassword: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]),
    admin: new FormControl(false)
  })

private validateForm() : boolean{
  if(this.userForm.invalid){
    this.toastService.showError('Error adding user', 'Error');
    return false;
  }

  if(this.userForm.value.username?.includes(' ')){
    this.toastService.showError('Username cannot contain spaces', 'Error');
    return false;
  }

  if(this.userForm.value.password?.includes(' ')){
    this.toastService.showError('Password cannot contain spaces', 'Error');
    return false;
  }

  if(this.userForm.value.confirmPassword?.includes(' ')){
    this.toastService.showError('Password cannot contain spaces', 'Error');
    return false;
  }

  if(this.userForm.value.password != this.userForm.value.confirmPassword){
    this.toastService.showError('Passwords must match', 'Error');
    return false;
  }
  return true;
}

  public postUser(){
    
    if(this.validateForm()){
      var user : UserDTO = {
        name : this.userForm.value.name ?? '',
        username: this.userForm.value.username ?? '',
        password: this.userForm.value.password ?? '',
        confirmPassword: this.userForm.value.confirmPassword ?? '',
        admin: !!this.userForm.value.admin
      }
      
      this.userService.PostUser(user);
      this.toastService.showSuccess('User successfully added', 'Success');
      this.router.navigate(['users']);
    }
    

  }

}
