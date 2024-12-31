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

  public async getCollaboratorById(id: number): Promise<Collaborator> {
    try {
      var collaborator = await this.http.get<Collaborator>(`${this.url}/${id}`).toPromise();
      if(collaborator == undefined){
        throw new Error('Collaborator not found');
      }
      return collaborator;
      
      } catch (error) {
      throw new Error('Could not retrieve collaborator');
    }
  }
  

  public async PostCollaborator(collaboratorDTO: collaboratorDTO) : Promise<void>{
    try{
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
