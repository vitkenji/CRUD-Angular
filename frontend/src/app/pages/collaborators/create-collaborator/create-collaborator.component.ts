import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Router } from '@angular/router';
import { collaboratorDTO } from '../../../models/DTO/collaboratorDTO';
import { CollaboratorService } from '../../../services/collaborator-service/collaborator.service';
import { ToastService } from '../../../services/toast-service/toast.service';
import { DatePipe } from '@angular/common';
import { CurrencyMaskModule } from "ng2-currency-mask";

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
          CurrencyMaskModule],
  providers: [DatePipe],
  templateUrl: './create-collaborator.component.html',
  styleUrl: './create-collaborator.component.css'
})
export class CreateCollaboratorComponent {

  constructor(private datePipe : DatePipe, private toastService : ToastService, private collaboratorService : CollaboratorService, private router : Router){}

  collaboratorForm = new  FormGroup({
    registrationNumber: new FormControl(),
    name: new FormControl(),
    CPF: new FormControl(),
    birthDate: new FormControl(),
    RG: new FormControl(),
    contribution: new FormControl(),
    collaboratorType: new FormControl(),
    admissionDate: new FormControl()
  });

  private validateForm() : boolean {
    return true;
  }

  public async postCollaborator(){
      if(this.validateForm()) {

      var collaborator : collaboratorDTO = {
        registrationNumber: parseInt(this.collaboratorForm.value.registrationNumber) ?? 0,
        name: this.collaboratorForm.value.name.toString() ?? '',
        CPF: parseFloat(this.collaboratorForm.value.CPF) ?? 0,
        birthDate: this.datePipe.transform(this.collaboratorForm.value.birthDate, 'yyyy-MM-dd') ?? '1800-01-01',
        RG: this.collaboratorForm.value.RG.toString() ?? '',
        contribution: parseFloat(this.collaboratorForm.value.contribution) ?? 0,
        collaboratorType: parseInt(this.collaboratorForm.value.collaboratorType) ?? 0,
        admissionDate: this.datePipe.transform(this.collaboratorForm.value.admissionDate, 'yyyy-MM-dd') ?? '1800-01-01',
      };
      console.log(this.collaboratorForm.value.birthDate)
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
}
