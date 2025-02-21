import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TelephoneDTO } from '../../models/DTO/telephoneDTO';

@Injectable({
  providedIn: 'root'
})
export class TelephoneService {

  constructor(private http: HttpClient) { }

  private url = 'https://localhost:7234/api/Telephone';

  public async PostTelephone(telephoneDTO : TelephoneDTO, personId: number) : Promise<void>{
    try{
      await this.http.post(`${this.url}/${personId}`, telephoneDTO).toPromise();
    }
    catch{
      throw new Error;
    }
  }

  public async DeleteTelephone(personId: number, telephoneId: number) : Promise<void>{
    try{
      await this.http.delete(`${this.url}/${personId}/${telephoneId}`).toPromise();
    }
    catch{
      throw new Error;
    }
  }

}
