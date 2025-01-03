import { Component } from '@angular/core';
import { AuthService } from '../../services/auth-service/auth.service';
@Component({
  selector: 'app-dashboard',
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  username : string;
  currentDate : string = '';

  constructor(private authService : AuthService){
    this.username = this.authService.getUsername();
    this.updateCurrentDate();
    setInterval(() => {
      this.updateCurrentDate();
    }, 1000);
  }

  updateCurrentDate() {
    const now = new Date();
    this.currentDate = now.toLocaleString();
  }


}
