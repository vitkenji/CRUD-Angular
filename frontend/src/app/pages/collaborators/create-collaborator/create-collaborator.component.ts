import { CommonModule, DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Router } from '@angular/router';
import { MaskitoDirective } from '@maskito/angular';
import { MaskitoOptions } from '@maskito/core';
import { CurrencyMaskModule } from "ng2-currency-mask";
import { collaboratorDTO } from '../../../models/DTO/collaboratorDTO';
import { CollaboratorService } from '../../../services/collaborator-service/collaborator.service';
import { ToastService } from '../../../services/toast-service/toast.service';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-create-collaborator',
  imports: [
            ReactiveFormsModule,
            MatFormFieldModule,
            MatInputModule,
            MatButtonModule,
            MatDatepickerModule,
            MatNativeDateModule,
            MatSelectModule,
            MaskitoDirective,
          CurrencyMaskModule
        ,CommonModule],
  providers: [DatePipe],
  templateUrl: './create-collaborator.component.html',
  styleUrl: './create-collaborator.component.css'
})
export class CreateCollaboratorComponent {

  constructor(private datePipe : DatePipe, private toastService : ToastService, private collaboratorService : CollaboratorService, private router : Router){}

  collaboratorForm = new  FormGroup({
    registrationNumber: new FormControl(null, [Validators.required]),
    name: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(50)]),
    CPF: new FormControl(null, [Validators.required]),
    birthDate: new FormControl(),
    RG: new FormControl('', [Validators.required]),
    contribution: new FormControl(),
    collaboratorType: new FormControl(null, [Validators.required]),
    admissionDate: new FormControl()
  });

  private validateForm() : boolean {

    if(this.collaboratorForm.invalid){
      this.toastService.showError('Error adding collaborator', 'Error');
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

  public async postCollaborator(){
      if(this.validateForm()) {
      
      var cpfRequest = this.collaboratorForm.value.CPF ?? '';
      var rgRequest = this.collaboratorForm.value.RG ?? '';
      var collaborator : collaboratorDTO = {
        registrationNumber: Number(this.collaboratorForm.value.registrationNumber) ?? 0,
        name: this.collaboratorForm.value.name ?? '',
        CPF: Number(cpfRequest.replace(/[^\d]/g, '')) ?? 0,
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

}
