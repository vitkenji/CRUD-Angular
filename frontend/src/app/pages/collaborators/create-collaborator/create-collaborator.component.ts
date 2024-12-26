import { Component } from '@angular/core';
import { CollaboratorService } from '../../../services/collaborator-service/collaborator.service';

@Component({
  selector: 'app-create-collaborator',
  imports: [],
  templateUrl: './create-collaborator.component.html',
  styleUrl: './create-collaborator.component.css'
})
export class CreateCollaboratorComponent {
  constructor(private collaboratorService : CollaboratorService){}
}
