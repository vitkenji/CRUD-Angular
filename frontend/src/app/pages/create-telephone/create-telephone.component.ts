import { Component, OnInit } from '@angular/core';
import { MaskitoDirective } from '@maskito/angular';
import { MaskitoOptions } from '@maskito/core';
import { TelephoneService } from '../../services/telephone-service/telephone.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { TelephoneDTO } from '../../models/DTO/telephoneDTO';
import { ToastService } from '../../services/toast-service/toast.service';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-create-telephone',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
  MaskitoDirective,
CommonModule,
MatButtonModule,
MatSelectModule],
  templateUrl: './create-telephone.component.html',
  styleUrl: './create-telephone.component.css'
})
export class CreateTelephoneComponent implements OnInit {

  personId : number = -1;
  telephoneForm : FormGroup;

  constructor(private telephoneService : TelephoneService, private router : Router, private route : ActivatedRoute,
    private toastService : ToastService, fb : FormBuilder) {
    this.telephoneForm = fb.group({
      'number' : ['', Validators.required],
      'telephoneType' : [null, Validators.required]
    });
  }

  ngOnInit(): void {
    this.personId = Number(this.route.snapshot.paramMap.get('id')?.slice(1));
  }

  public async postTelephone() {
    if(this.validateForm()) {
    var telephone : TelephoneDTO = {
      number : String(this.telephoneForm.value.number),
      telephoneType : Number(this.telephoneForm.value.telephoneType)
    };
    await this.telephoneService.PostTelephone(telephone, this.personId);
    this.toastService.showSuccess('Telephone successfully added', 'Success');
    this.router.navigate([`update-collaborator/:${this.personId}`]);
  }
  }

  validateForm() : boolean {
    if(this.telephoneForm.invalid){
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

  readonly numberMask: MaskitoOptions = {
      mask: ['(', /\d/, /\d/,') ', /\d/, /\d/, /\d/, /\d/, /\d/,/\d/,'-', /\d/,/\d/, /\d/ ,/\d/],
    };
}
