import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../../models/user';
import { UserDTO } from '../../models/DTO/userDTO';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  private url = 'https://localhost:7234/api/User';

  public async GetUsers(): Promise<User[] | undefined>{
    try{
      return await this.http.get<User[]>(this.url).toPromise();
    }
    catch{
      return undefined;
    }
  }

  public async GetUserByUsername(username: string): Promise<User | undefined>{
    try{
      return await this.http.get<User>(`${this.url}/${username}`).toPromise();
    }
    catch{
      return undefined;      
    }
  }

  public async PostUser(userDTO : UserDTO){
    try{
      await this.http.post(this.url, userDTO);
    }
    catch{
      return;
    }
  }

  public async DeleteUser(username: string){
    try{
      await this.http.delete(`${this.url}/${username}`);
    }
    catch{
      return;
    }
  }

}
