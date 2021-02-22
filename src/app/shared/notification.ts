import {ToastrService} from 'ngx-toastr';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
  })
  
export class NotificationService {
constructor(private toast: ToastrService){}

showWarning(){
    this.toast.warning("Error message", "Login Error");
}
}