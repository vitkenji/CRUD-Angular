import { Component } from '@angular/core';
import { MenuComponent } from '../menu/menu.component';
import { RouterModule } from '@angular/router';
import { Router } from 'express';

@Component({
  selector: 'app-main-app',
  imports: [MenuComponent, RouterModule],
  templateUrl: './main-app.component.html',
  styleUrl: './main-app.component.css'
})
export class MainAppComponent {

}
