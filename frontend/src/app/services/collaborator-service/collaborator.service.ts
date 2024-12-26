import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { Collaborator } from '../../models/collaborator';
import { collaboratorDTO } from '../../models/DTO/collaboratorDTO';

@Injectable({
  providedIn: 'root'
})
export class CollaboratorService {

  constructor(private http: HttpClient) { }

  private url = 'https://localhost:7234/api/Collaborator';

  public async getCollaborators(): Promise<Collaborator[] | undefined> {
    try{
      return await this.http.get<Collaborator[]>(this.url).pipe().toPromise();
    }
    catch{
      return [];
    }
  }

  public async getCollaboratorById(id :number): Promise<Collaborator | undefined>{
    try{
     return await this.http.get<Collaborator>(`${this.url}/${id}`).pipe().toPromise();
    }
    catch{
      return undefined;
    }
  }

  public async PostCollaborator(collaboratorDTO: collaboratorDTO){
    try{
      await this.http.post(this.url, collaboratorDTO);
    }
    catch{
      return;
    }
  }

  public async DeleteCollaborator(id: number){
    try{
      await this.http.delete(`${this.url}/${id}`);
    }
    catch{
      return;
    }
    
  }

}
