import { CommonModule, DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ActivatedRoute, Router } from '@angular/router';
import { CurrencyMaskModule } from "ng2-currency-mask";
import { UserDTO } from '../../../models/DTO/userDTO';
import { User } from '../../../models/user';
import { ToastService } from '../../../services/toast-service/toast.service';
import { UserService } from '../../../services/user-service/user.service';

@Component({
  selector: 'app-update-user',
  imports: [ ReactiveFormsModule,
                MatFormFieldModule,
                MatInputModule,
                MatButtonModule,
                MatDatepickerModule,
                MatNativeDateModule,
                MatSelectModule,
              CurrencyMaskModule,
              MatCheckboxModule,
            CommonModule],
            providers:[DatePipe],
  templateUrl: './update-user.component.html',
  styleUrl: './update-user.component.css'
})
export class UpdateUserComponent implements OnInit{

  constructor(private datePipe : DatePipe, private toastService : ToastService, private userService : UserService, 
      private router : Router, private route : ActivatedRoute, fb : FormBuilder){
        this.userForm = fb.group({
          'username': [{ disabled: true }],
          'name': ['', Validators.compose([Validators.required])],
          'password': ['', Validators.compose([Validators.required])],
          'confirmPassword': ['', Validators.compose([Validators.required])],
          'admin': [{ disabled : true }]
        });
    }
  
    username: string = '';
    user? : User;
    userForm : FormGroup;

  ngOnInit(): void {
    this.username = this.route.snapshot.paramMap.get('id')!;
    this.loadUser();

  }

  async loadUser(){
      this.user  = await this.userService.GetUserByUsername(this.username);
      if (this.user) {
      this.userForm.patchValue({
        name : this.user.name,
        username : this.user.username,
        password : this.user.password,
        confirmPassword : this.user.password,
        admin : !!this.user.admin
      });
    }
    }
  
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

  public async postUser(){
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
