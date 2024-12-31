import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AddressService } from '../../services/address-service/address.service';
import { ToastService } from '../../services/toast-service/toast.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-delete-address',
  imports: [],
  templateUrl: './delete-address.component.html',
  styleUrl: './delete-address.component.css'
})
export class DeleteAddressComponent {
  constructor(public dialogRef: MatDialogRef<DeleteAddressComponent>,
        @Inject(MAT_DIALOG_DATA) public data : any,
        private addressService : AddressService,
        private toastService : ToastService,
        private location : Location
      ) { }
    
      closeDialog() {
        this.dialogRef.close();
      }
    
      public async deleteAddress(){
        await this.addressService.DeleteAddress(this.data.person.id, this.data.address.id);
        this.dialogRef.close('delete');
      this.toastService.showSuccess('Address successfully removed', 'Success');
      this.reload();
      }

      reload(): void {
        this.location.go(this.location.path());
      }
  
}
