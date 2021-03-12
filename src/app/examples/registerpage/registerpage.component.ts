import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { dev } from '../../config/dev';
import { RestApiService } from '../../shared/rest-api.service';
import { NotificationService } from '../../shared/notification';
import { ToastrService } from 'ngx-toastr';
import {CookieService} from 'angular2-cookie';



@Component({
  selector: 'app-registerpage',
  templateUrl: 'registerpage.component.html'
})
export class RegisterpageComponent implements  OnInit, OnDestroy {
  focus;
  focus1;
  focus2;
  focus3;
  focus4;
  focus5;

  email: String;
  remember: String;
  password: String;
  error: String;
  notification: boolean;
  wrongdetails: boolean;


  semail: String;
  spassword: String;
  srole: String = 'User';
  sdepartment: String = 'User';
  sname: String;
  serror: String;
  snotification: boolean;
  swrongdetails: boolean;
  scode: Number;
  public Formdata: any = {};


    url = dev.connect;
    private loggedInStatus = JSON.parse(localStorage.getItem('LoggedIn') || 'false');
    public access_token: string;

constructor(
            private http: HttpClient, private router: Router,
            private notificationservice: NotificationService,
            private toast: ToastrService,
            // tslint:disable-next-line:variable-name
            private _cookieService: CookieService
  ) {
      if (_cookieService.get('remember')) {
          this.email = this._cookieService.get('email');
          this.password = this._cookieService.get('password');
          this.Formdata.remember = this._cookieService.get('remember');
      }
  }

ngOnInit() {
    const body = document.getElementsByTagName('body')[0];
    body.classList.add('register-page');

    const signUpButton = document.getElementById('signUp');
    const signInButton = document.getElementById('signIn');
    const container = document.getElementById('container')


    signUpButton.addEventListener('click', () => {
      console.log('Clicked signup');
      container.classList.add('right-panel-active');
    });

    signInButton.addEventListener('click', () => {
      console.log('Clicked signin');
      container.classList.remove('right-panel-active');
    });
  }

ngOnDestroy() {
    const body = document.getElementsByTagName('body')[0];
    body.classList.remove('register-page');
  }

    setLoggedIn(value: boolean) {
        this.loggedInStatus = value;
        localStorage.setItem('loggedIn', 'true');
    }

    get isLoggedIn() {
        return JSON.parse(localStorage.getItem('loggedIn') || this.loggedInStatus.toString());
    }

signIn() {
  if (this.email === undefined || this.password === undefined ||
     this.email === '' || this.password === '' ||
     this.email == null || this.password == null) {

        this.notification = true;
        this.wrongdetails = false;
  } else if (!this.email.includes('@')) {
      this.error = 'An error occured email must have @ symbol.';
      this.wrongdetails = true;
      this.notification = false;
  } else if ( !this.email.includes('.')) {
    this.error = 'An error occured email must include "." dot ';
    this.wrongdetails = true;
    this.notification = false;
  } else if (this.email.includes('@') && this.email.includes('.')) {

    const payload = {
      email: this.email,
      password: this.password
    };

    this.http.post<any>(this.url + '/api/user/login', payload).subscribe(data => {
      if (data) {
        this.saveUserDetails(data);
        this._cookieService.put('email', data.email);
        this._cookieService.put('password', data.password);
        this._cookieService.put('remember', this.Formdata.remember);
          localStorage.setItem('email', data.email);
          this.setToken();

          // this.setLoggedIn(true);
        // tslint:disable-next-line:triple-equals
        if (data.role == 'User') {
              this.router.navigateByUrl('all-templates');
          }
          // tslint:disable-next-line:triple-equals
        if (data.role == 'Admin') {
              this.router.navigateByUrl('landing-page');
          }
      } else {
          localStorage.removeItem('loggedIn');
      }
    }, error => {
     // console.log("An error occured");
     alert('Login error, you sure you used the right credentials email or password is wrong?');
    }
    );
  }
}

verify() {
  const container = document.getElementById('container');

  if (this.semail === undefined || this.spassword === undefined || this.sname === undefined) {
    this.snotification = true;
  } else if (!this.semail.includes('@')) {
    this.error = 'An error occured email must have @ symbol.';
    this.swrongdetails = true;
    this.snotification = false;
} else if (!this.semail.includes('.')) {
  this.error = 'An error occured email must include "." dot ';
  this.swrongdetails = true;
  this.snotification = false;
} else {
    const payload = {
      email: this.semail,
      role: this.srole,
      password: this.spassword,
      department: this.sdepartment,
      name: this.sname,

    };

    this.http.post<any>(this.url + '/api/user/verify', payload).subscribe(data => {
      if (data) {
          // this.toast.success("Use the code sent to your email to finalize the account creation", "Registration Message!");
          (document.getElementById('code') as HTMLElement).style.display = 'block';
          (document.getElementById('verify') as HTMLElement).style.display = 'none';
          (document.getElementById('signup') as HTMLElement).style.display = 'block';

          alert('Use the code sent to your email to finalize the account creation');
      }
    }, error => {
      alert('An error occured the email entered doesnt exist.');
    //  (document.getElementById('sger') as HTMLElement).style.display = 'block';
    }
    );
  }
}

signUp() {
  const container = document.getElementById('container');
  if (this.semail === undefined || this.spassword === undefined || this.sname === undefined) {
    this.snotification = true;
  } else if (!this.semail.includes('@')) {
    this.error = 'An error occured email must have @ symbol.';
    this.swrongdetails = true;
    this.snotification = false;
} else if (!this.semail.includes('.')) {
  this.error = 'An error occured email must include "." dot ';
  this.swrongdetails = true;
  this.snotification = false;
} else {
    const payload = {
      email: this.semail,
      role: this.srole,
      password: this.spassword,
      department: this.sdepartment,
      name: this.sname,
      code : this.scode
    };
    console.log(payload);

    this.http.post<any>(this.url + '/api/user/register', payload).subscribe(data => {
      if (data) {
        console.log(data);
        container.classList.remove('right-panel-active');
      }

    });
  }
}

saveUserDetails(user) {
  localStorage.setItem('profile', user._id.toString());
}

setToken(){
   const email = localStorage.getItem('email');
    this.http.get<any>('https://sanaa.adiy.site/api/auth/make?email=' + email, { responseType: 'text' as 'json'}).subscribe(data => {
        this.access_token = data;
        localStorage.setItem('access_token', data);
    })

}
}
