import { Component, OnInit, OnDestroy } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { dev } from '../../config/dev';
import { Router } from '@angular/router';


@Component({
  selector: "app-resetpage",
  templateUrl: "resetpage.component.html"
})
export class ResetpageComponent implements OnInit, OnDestroy {
  focus;
  focus1;
  focus2;

  email: String;
  code: Number;
  password: String;

  url = dev.connect;

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit() {
    var body = document.getElementsByTagName("body")[0];
    body.classList.add("reset-page");
  }
  ngOnDestroy(){
    var body = document.getElementsByTagName("body")[0];
    body.classList.remove("reset-page");
  }


  getCode(){
    console.log(this.email);
    const payload ={
      email: this.email
    }

    this.http.post<any>(this.url + '/api/user/resetcode', payload).subscribe(data => {
      if (data) {
        (document.getElementById('pass') as HTMLElement).style.display = 'block';
        (document.getElementById('code') as HTMLElement).style.display = 'block';
        (document.getElementById('resetbtn') as HTMLElement).style.display = 'block';
        (document.getElementById('resetcodebtn') as HTMLElement).style.display='none';
        alert("Use the code sent to your email to finalize the account creation");
      } 
    }, error=>{
     alert("Reset code error?");
    }
    );
  }

  resetPassword(){
     const payload = {
       email: this.email,
       reset_code: this.code,
       password : this.password
     }
     this.http.post<any>(this.url + '/api/user/resetpassword', payload).subscribe(data => {
      if (data) {
        console.log(data);
        this.router.navigateByUrl('register-page');
      } 
    }, error=>{
     alert("An error occured, are you sure you used the right reset code?");
    }
    );
  }

}
