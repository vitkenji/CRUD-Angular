import { inject, Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class ToastService {

  private toast = inject(ToastrService);

  constructor() {}

  public showSuccess(message: string, title: string) {
    this.toast.success(message, title, {
      timeOut: 3000,
      positionClass: 'toast-bottom-right'
    });
  }
  
  public showError(message: string, title: string) {
    this.toast.error(message, title, {
      timeOut: 3000,
      positionClass: 'toast-bottom-right'
    });
  }
}
