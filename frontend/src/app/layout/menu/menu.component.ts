import { Component } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth-service/auth.service';

@Component({
  selector: 'app-menu',
  imports: [MatIconModule, MatToolbarModule, MatListModule, MatSidenavModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent {
  username : string;
  constructor(private router: Router, private authService : AuthService){
    this.username = this.authService.getUsername();
  }

  public navigateTo(route: string) {
    this.router.navigate([route]);
  }

  public logout(){
    this.authService.logout();
    this.router.navigate(['login']);
  }

}
