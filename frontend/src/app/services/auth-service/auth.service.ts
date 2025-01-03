import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  
  private url = 'https://localhost:7234/login';

  response : any = 
  {
    token : '',
  }

  private isLoggedInSubject: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);

  constructor(private router: Router, private http: HttpClient) { }

  public getUsername() : string{
    return localStorage.getItem('username') ?? '';
  }

  public async login(username: string, password: string) : Promise<boolean> {
    try{
      this.logout();
      this.response = await this.http.get<string>(`${this.url}/${username}/${password}`).toPromise();
      if(this.response){
        localStorage.setItem('access_token', String(this.response.token));
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('username', username);
        return true;
      }
      return false;
    }
    catch(error: any){
      console.log(error);
      return false;
    }
  }

  logout() {
    this.isLoggedInSubject.next(false);
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('access_token');
    localStorage.removeItem('username');
  }

  public hasValidToken(): boolean | Promise<boolean> {
    const authToken = localStorage.getItem('access_token') || '';
    if (!!authToken) {
      return true;
    }
    return false;
  }

}
