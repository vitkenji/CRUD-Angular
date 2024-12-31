import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MaskitoDirective } from '@maskito/angular';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { MaskitoOptions } from '@maskito/core';
import { AddressService } from '../../services/address-service/address.service';
import { MatIconModule } from '@angular/material/icon';
import { Validators } from '@angular/forms';
import { ToastService } from '../../services/toast-service/toast.service';
import { AddressDTO } from '../../models/DTO/addressDTO';

@Component({
  selector: 'app-create-address',
   imports: [
      ReactiveFormsModule,
      MatFormFieldModule,
      MatInputModule,
    MaskitoDirective,
  CommonModule,
  MatButtonModule,
  MatSelectModule,
MatIconModule],
  templateUrl: './create-address.component.html',
  styleUrl: './create-address.component.css'
})
export class CreateAddressComponent implements OnInit{

addressForm : FormGroup;
personId : number = -1;

  constructor(private router : Router, private route : ActivatedRoute, fb: FormBuilder ,
     private addressService : AddressService, private toastService : ToastService) {
    this.addressForm = fb.group({
      'CEP' : [null, Validators.required],
      'street' : ['', Validators.required],
      'number' : ['', Validators.required],
      'neighborhood' : ['', Validators.required],
      'city' : ['', Validators.required],
      'addressType' : [null, Validators.required],
    });
  }

  ngOnInit(): void {
    this.personId = Number(this.route.snapshot.paramMap.get('id')?.slice(1));
  }

  public async postAddress() { 
    if(this.validateForm()) {
        var address : AddressDTO = {
         CEP  : Number(this.addressForm.value.CEP.replace(/[^\d]/g, '')),
         street : this.addressForm.value.street,
         neighborhood : this.addressForm.value.neighborhood,
         number : this.addressForm.value.number,
         addressType : Number(this.addressForm.value.addressType),
         city : this.addressForm.value.city
        };
        await this.addressService.PostAddress(address, this.personId);
        this.toastService.showSuccess('Address successfully added', 'Success');
        this.router.navigate([`update-collaborator/:${this.personId}`]);
      }
  }

  validateForm() : boolean {
    if(this.addressForm.invalid){
      this.toastService.showError('Error adding telephone', 'Error');
      return false;
    }
    return true;
  }

  validateNumber(event : any) {
    
    const keyCode = event.keyCode;

    const excludedKeys = [8, 37, 39, 46];

    if (!((keyCode >= 48 && keyCode <= 57) ||
      (keyCode >= 96 && keyCode <= 105) ||
      (excludedKeys.includes(keyCode)))) {
      event.preventDefault();
    }
  }

  public async getAddressByCEP() {
    var CEP = Number(this.addressForm.value.CEP.replace(/[^\d]/g, ''));
    var response = await this.addressService.GetAddressByCEP(CEP);
    if (response != undefined || response != null) {
      this.addressForm.patchValue({
        street : response.logradouro,
        number : response.complemento,
        city : response.localidade,
        neighborhood : response.bairro       
      });
  }

  }

  readonly numberMask: MaskitoOptions = {
        mask: [/\d/, /\d/, /\d/, /\d/, /\d/, '-',/\d/, /\d/, /\d/],
      };

}
