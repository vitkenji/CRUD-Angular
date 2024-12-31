import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth-service/auth.service';
import { ToastService } from '../../services/toast-service/toast.service';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule,
          MatFormFieldModule,
          MatInputModule,
          MatButtonModule,
          CommonModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  
  public showPassword: boolean = false;
  loginForm : FormGroup;
  
  constructor(private authService : AuthService, fb : FormBuilder, private router : Router, private toastService : ToastService){

    this.loginForm = fb.group({
      'username' : ['', Validators.required],
      'password' : ['', Validators.required]
    });
  }

  async login(){
    var token = await this.authService.login(String(this.loginForm.value.username), String(this.loginForm.value.password));
    if(token)
    {
        this.router.navigate(['']);
    }
    else
    {
      this.toastService.showError('Username or password invalid', 'Error');
    }
  }
}
