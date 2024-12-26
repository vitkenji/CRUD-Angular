import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AddressDTO } from '../../models/DTO/addressDTO';

@Injectable({
  providedIn: 'root'
})
export class AddressService {
  
  public constructor(private http: HttpClient){}

  private url = 'https://localhost:7234/api/Address';

  public async PostAddress(addressDTO : AddressDTO, personId: number){
    try{
      await this.http.post(`${this.url}/${personId}`, addressDTO);
    }
    catch{
      return;
    }
  }

  public async DeleteAddress(personId: number, addressId: number){
    try{
      await this.http.delete(`${this.url}/${personId}/${addressId}`);
    }
    catch{
      return;
    }
  }

}
