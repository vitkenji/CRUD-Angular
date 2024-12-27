import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Collaborator } from '../../models/collaborator';
import { collaboratorDTO } from '../../models/DTO/collaboratorDTO';

@Injectable({
  providedIn: 'root',
})
export class CollaboratorService {

  constructor(private http: HttpClient) { }

  private url = 'https://localhost:7234/api/Collaborator';

  public async getCollaborators(): Promise<Collaborator[] | undefined> {
    try{
      return await this.http.get<Collaborator[]>(this.url).toPromise();
    }
    catch{
      return [];
    }
  }

  public async getCollaboratorById(id :number): Promise<Collaborator | undefined>{
    try{
     return await this.http.get<Collaborator>(`${this.url}/${id}`).toPromise();
    }
    catch{
      return undefined;
    }
  }

  public async PostCollaborator(collaboratorDTO: collaboratorDTO) : Promise<void>{
    try{
      console.log(this.url);
      console.log(collaboratorDTO);
      await this.http.post(this.url, collaboratorDTO).toPromise();
    }
    catch (error : any){
      console.log(error);
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
