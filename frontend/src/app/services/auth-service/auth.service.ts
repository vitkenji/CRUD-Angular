import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  
  private url = 'https://localhost:7234/api/User/login';

  userData: any = JSON.parse(localStorage.getItem('user_data')!);

  private isLoggedInSubject: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);

  constructor(private router: Router, private http: HttpClient) { }

  public async login(username: string, password: string) {
    try{
      var response = await this.http.get<string>(this.url);
      await this.getToken(response);
      return this.hasValidToken();
    }
    catch(error: any){
      console.log(error);
      return;
    }
  }

  logout() {
    this.isLoggedInSubject.next(false);
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('access_token');
  }

  private async getToken(response: any) {
    try {
      let accessToken = (await firstValueFrom<any>(response))?.access_token;
      if (accessToken) {
        localStorage.setItem('access_token', accessToken);
        localStorage.setItem('isLoggedIn', 'true');

        let payload = this.decodeBase64(accessToken.split('.')[1]);

        localStorage.setItem(
          'user_data',
          JSON.stringify(JSON.parse(payload))
        );
        this.userData = JSON.parse(localStorage.getItem('user_data')!);
        
        this.isLoggedInSubject.next(true);
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  private parseJwt(token: string) {
    if (token) {
      if (token.indexOf('.') > 0) {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(
          atob(base64)
            .split('')
            .map((c) => {
              return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
            })
            .join('')
        );
        return JSON.parse(jsonPayload);
      }
    }
  }

  public hasValidToken(): boolean | Promise<boolean> {
    const authToken = localStorage.getItem('access_token') || '';
    let expiresIn = this.parseJwt(authToken)
      ? this.parseJwt(authToken).exp * 1000
      : 0;
    if (!!authToken && (expiresIn === 0 || expiresIn > Date.now())) {
      return true;
    }
    return false;
  }

  private decodeBase64(base64: string): string {
    let decoded = window.atob(base64);
    try {
      decoded = decodeURIComponent(escape(decoded));
    } catch (e) {
      console.error('decodeBase64 error:', e);
    }
    return decoded;
  }

}
