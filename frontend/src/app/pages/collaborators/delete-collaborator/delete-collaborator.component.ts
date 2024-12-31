import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Collaborator } from '../../../models/collaborator';
import { CollaboratorService } from '../../../services/collaborator-service/collaborator.service';
import { Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-collaborator',
  imports: [],
  templateUrl: './delete-collaborator.component.html',
  styleUrl: './delete-collaborator.component.css'
})
export class DeleteCollaboratorComponent {
  constructor(public dialogRef: MatDialogRef<DeleteCollaboratorComponent>,
      @Inject(MAT_DIALOG_DATA) public collaborator: Collaborator,
      private collaboratorService : CollaboratorService
    ) { }
  
    closeDialog() {
      this.dialogRef.close();
    }
  
    public async deleteCollaborator(){
      await this.collaboratorService.DeleteCollaborator(this.collaborator.id);
      this.dialogRef.close('delete');
    }
}
