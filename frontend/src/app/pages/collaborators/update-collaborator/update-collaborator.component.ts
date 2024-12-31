import { CommonModule, DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { MaskitoDirective } from '@maskito/angular';
import { MaskitoOptions } from '@maskito/core';
import { CurrencyMaskModule } from "ng2-currency-mask";
import { Address } from '../../../models/address';
import { Collaborator } from '../../../models/collaborator';
import { collaboratorDTO } from '../../../models/DTO/collaboratorDTO';
import { Person } from '../../../models/person';
import { Telephone } from '../../../models/telephone';
import { CollaboratorService } from '../../../services/collaborator-service/collaborator.service';
import { ToastService } from '../../../services/toast-service/toast.service';
import { MatDialog } from '@angular/material/dialog';
import { DeleteAddressComponent } from '../../delete-address/delete-address.component';
import { DeleteTelephoneComponent } from '../../delete-telephone/delete-telephone.component';
import { Location } from '@angular/common';

@Component({
  selector: 'app-update-collaborator',
  imports: [ ReactiveFormsModule,
              MatFormFieldModule,
              MatInputModule,
              MatTableModule,
              MatButtonModule,
              MatDatepickerModule,
              MatNativeDateModule,
              MatSelectModule,
              MaskitoDirective,
            CurrencyMaskModule
          ,CommonModule],
          providers:[DatePipe],
  templateUrl: './update-collaborator.component.html',
  styleUrl: './update-collaborator.component.css'
})
export class UpdateCollaboratorComponent implements OnInit{

  constructor(private datePipe : DatePipe, private toastService : ToastService, private collaboratorService : CollaboratorService, 
    private router : Router, private route : ActivatedRoute, fb : FormBuilder, public dialog : MatDialog, private location : Location){
      this.collaboratorForm = fb.group({
        'registrationNumber': [null, Validators.required],
        'name': ['', Validators.compose([Validators.required, Validators.minLength(6), Validators.maxLength(50)])],
        'CPF': [ Validators.required],
        'birthDate': [null],
        'RG': [Validators.required],
        'contribution': [null],
        'collaboratorType': [0, Validators.required],
        'admissionDate': [null]
      });
  }

  collaboratorId: number = -1;
  collaborator?: Collaborator;
  person? : Person;
  collaboratorForm : FormGroup;

  addressDataSource: MatTableDataSource<Address> = new MatTableDataSource<Address>();
  addressColumnsToDisplay = ['CEP', 'street', 'number','neighborhood','city', 'type','delete'];

  telephoneDataSource: MatTableDataSource<Telephone> = new MatTableDataSource<Telephone>();
  telephoneColumnsToDisplay = ['number', 'type','delete'];
  
  ngOnInit(): void {
    
    this.collaboratorId = Number(this.route.snapshot.paramMap.get('id')?.slice(1));
    this.loadCollaborator();

  }

  async loadCollaborator(){
    this.collaborator  = await this.collaboratorService.getCollaboratorById(this.collaboratorId);
    this.addressDataSource.data = this.collaborator.person?.addresses!;
    this.telephoneDataSource.data = this.collaborator.person?.telephones!;

    this.person = this.collaborator.person;

    if (this.collaborator) {
      this.collaboratorForm.patchValue({
        registrationNumber: this.collaborator.registrationNumber,
        name: this.collaborator.person?.name,
        CPF: this.collaborator.person?.cpf,
        birthDate: this.collaborator.person?.birthDate,
        RG: this.collaborator.person?.rg,
        contribution: this.collaborator.contribution,
        collaboratorType: String(this.collaborator.collaboratorType),
        admissionDate: this.collaborator.admissionDate
      });
  }
  }



    private validateForm() : boolean {
  
      if(this.collaboratorForm.invalid){
        this.toastService.showError('Error adding user', 'Error');
        return false;
      }
  
      var today = new Date();
      var date = new Date(this.collaboratorForm.value.birthDate);
      var age = today.getFullYear() - date.getFullYear();
      if(today.getMonth() < date.getMonth() || today.getMonth() == date.getMonth() && today.getDay() < date.getDay())
      {
        age--;
      }
      if(age < 18){
        this.toastService.showError('Collaborator must be at least 18 years old', 'Error');
        return false;
      }
  
      return true;
    }
  
    public async putCollaborator(){
        if(this.validateForm()) {
        
        var cpfRequest = this.collaboratorForm.value.CPF ?? '';
        var rgRequest = this.collaboratorForm.value.RG ?? '';
        var collaborator : collaboratorDTO = {
          registrationNumber: Number(this.collaboratorForm.value.registrationNumber) ?? 0,
          name: this.collaboratorForm.value.name ?? '',
          CPF: cpfRequest ?? 0,
          birthDate: this.datePipe.transform(this.collaboratorForm.value.birthDate, 'yyyy-MM-dd') ?? '1800-01-01',
          RG: rgRequest.replace(/[^\d]/g, '') ?? '',
          contribution: parseFloat(this.collaboratorForm.value.contribution) ?? 0,
          collaboratorType: Number(this.collaboratorForm.value.collaboratorType) ?? 0,
          admissionDate: this.datePipe.transform(this.collaboratorForm.value.admissionDate, 'yyyy-MM-dd') ?? '1800-01-01',
        };

        await this.collaboratorService.PostCollaborator(collaborator);
        this.toastService.showSuccess('Collaborator successfully added', 'Success');
        this.router.navigate(['collaborators']);
  
      }
    }

    async openAddressDialog(address : Address) {
      this.dialog.open(DeleteAddressComponent, {
        data : {
          person : this.person,
          address : address
        }
      });
    }
  
    async openTelephoneDialog(telephone : Telephone) {
      this.dialog.open(DeleteTelephoneComponent, {
        data : {
          person : this.person,
          telephone : telephone
        }
      });
    }

    reload(): void {
      this.location.go(this.location.path());
    }

    public navigateTo(route: string, append?: number) {
      var path = route;
      if(append != null){
        path = path + `/:${append}`;
      }
      this.router.navigate([path]);
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
  
    readonly CPFmask: MaskitoOptions = {
      mask: [/\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/,'.',/\d/,/\d/,/\d/,'-', /\d/,/\d/,],
    };
  
    readonly RGmask: MaskitoOptions = {
      mask: [/\d/, /\d/, '.', /\d/, /\d/, /\d/,'.',/\d/,/\d/,/\d/,'-', /\d/,],
    };

    public getAddressType(type: number) : string {
      const addressTypes: { [key: number]: string } = {
       1 : 'Home',
       2 : 'Business',
      };
      return addressTypes[type] ?? "Unknown";
   }

    public getTelephoneType(type: number) : string {
      const telephoneTypes: { [key: number]: string } = {
       1 : 'Home',
       2 : 'Business',
       3 : 'Cellphone'
      };
      return telephoneTypes[type] ?? "Unknown";
   }
}
