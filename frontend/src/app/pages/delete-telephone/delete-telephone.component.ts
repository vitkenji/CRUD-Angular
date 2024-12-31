import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TelephoneService } from '../../services/telephone-service/telephone.service';
import { ToastService } from '../../services/toast-service/toast.service';
import { Location } from '@angular/common';


@Component({
  selector: 'app-delete-telephone',
  imports: [],
  templateUrl: './delete-telephone.component.html',
  styleUrl: './delete-telephone.component.css'
})
export class DeleteTelephoneComponent {
  constructor(public dialogRef: MatDialogRef<DeleteTelephoneComponent>,
        @Inject(MAT_DIALOG_DATA) public data : any,
        private telephoneService : TelephoneService,
        private toastService : ToastService,
        private location : Location
      ) { }
    
      closeDialog() {
        this.dialogRef.close();
      }
    
      public async deleteTelephone(){
        await this.telephoneService.DeleteTelephone(this.data.person.id, this.data.telephone.id);
        this.dialogRef.close('delete');
        this.toastService.showSuccess('Telephone successfully removed', 'Success');
        this.reload();
      }

      reload(): void {
        this.location.go(this.location.path());
      }
  
}
