import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AddressDTO } from '../../models/DTO/addressDTO';
import { ViaCEPResponse } from '../../models/viaCEPresponse';

@Injectable({
  providedIn: 'root'
})
export class AddressService {
  
  public constructor(private http: HttpClient){}

  private url = 'https://localhost:7234/api/Address';

  public async PostAddress(addressDTO : AddressDTO, personId: number) : Promise<void>{
    try{
      await this.http.post(`${this.url}/${personId}`, addressDTO).toPromise();
    }
    catch{
      throw new Error;
    }
  }

  public async DeleteAddress(personId: number, addressId: number) : Promise<void>{
    try{
      await this.http.delete(`${this.url}/${personId}/${addressId}`).toPromise();
    }
    catch{
      throw new Error;
    }
  }

  public async GetAddressByCEP(cep : number ) : Promise<ViaCEPResponse> {
    try{
      var response =  await this.http.get<ViaCEPResponse>(`${this.url}/${cep}`).toPromise();
      if(response == undefined){
        throw new Error;
      }
      return response;
    }
    catch{
      throw new Error;
    }
  }

}
