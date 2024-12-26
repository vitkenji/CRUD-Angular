import { Component, OnInit } from '@angular/core';
import { CollaboratorService } from '../../../services/collaborator-service/collaborator.service';
import { Collaborator } from '../../../models/collaborator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-collaborators',
  imports: [MatTableModule],
  templateUrl: './collaborators.component.html',
  styleUrl: './collaborators.component.css'
})

export class CollaboratorsComponent implements OnInit {
  
  collaborators : Collaborator[] = [];
  dataSource : MatTableDataSource<Collaborator> = new MatTableDataSource<Collaborator>();
  columnsToDisplay = ['registrationNumber', 'name', 'type'];
 
  constructor(private collaboratorService : CollaboratorService){}

  ngOnInit(): void {
    this.loadCollaborators();
  }

  async loadCollaborators(){
    var response = await this.collaboratorService.getCollaborators();
    if(response != undefined){
      this.collaborators = response;
      this.dataSource.data = response;
    }
  }

}
