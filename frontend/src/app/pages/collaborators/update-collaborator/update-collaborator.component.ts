import { Component } from '@angular/core';
import { CollaboratorService } from '../../../services/collaborator-service/collaborator.service';

@Component({
  selector: 'app-update-collaborator',
  imports: [],
  templateUrl: './update-collaborator.component.html',
  styleUrl: './update-collaborator.component.css'
})
export class UpdateCollaboratorComponent {

  constructor(private collaboratorService : CollaboratorService){}
}
