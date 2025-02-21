import { Component, OnInit } from '@angular/core';
import { CollaboratorService } from '../../../services/collaborator-service/collaborator.service';
import { Collaborator } from '../../../models/collaborator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';
import { DeleteCollaboratorComponent } from '../delete-collaborator/delete-collaborator.component';

@Component({
  selector: 'app-collaborators',
  imports: [MatTableModule, MatButtonModule, MatDialogModule],
  templateUrl: './collaborators.component.html',
  styleUrl: './collaborators.component.css',
})
export class CollaboratorsComponent implements OnInit {
  collaborators: Collaborator[] = [];
  dataSource: MatTableDataSource<Collaborator> =
    new MatTableDataSource<Collaborator>();
  columnsToDisplay = ['registrationNumber', 'name', 'type', 'edit', 'delete'];

  constructor(private collaboratorService: CollaboratorService, private router : Router, public dialog : MatDialog) {}

  ngOnInit(): void {
    this.loadCollaborators();
  }

  async loadCollaborators() {
    var response = await this.collaboratorService.getCollaborators();
    if (response != undefined) {
      this.collaborators = response;
      this.dataSource.data = response;
    }
  }

  public getCollaboratorType(type: number) : string {
     const collaboratorTypes: { [key: number]: string } = {
      1 : 'Permanent',
      2 : 'Intern',
      3 : 'Outsourced'
     };

     return collaboratorTypes[type] ?? "Unknown";

  }

  public navigateTo(route: string, append?: number) {
    var path = route;
    if(append != null){
      path = path + `/:${append}`;
    }
    this.router.navigate([path]);
  }

  openDialog(collaborator : Collaborator) {
      this.dialog.open(DeleteCollaboratorComponent, {
        data : collaborator
      });
    }

}