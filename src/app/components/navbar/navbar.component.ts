import { Component, OnInit } from "@angular/core";
import { Router, NavigationEnd } from "@angular/router";
import {UsersService} from "../../shared/users.service";


@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.scss"]
})
export class NavbarComponent implements OnInit {
  isCollapsed = true;
  public UserExpiry: any;
  public users: any = [];
  private profile: any;
  private currentDate: Date;
  public expiryDate: Date;
  public isActive: boolean;
  constructor(private router: Router, public UsersRestApi: UsersService) {
    router.events.subscribe(val => {
      this.isCollapsed = true;
    });
  }
  mobileView(){
    if (window.innerWidth < 992) {
        return true;
    }
    return false;
  }
  ngOnInit() {
    this.loadAllUsers();
    this.profile =  localStorage.getItem('profile');
  }

  logout(){
    localStorage.removeItem('profile');
    localStorage.removeItem('access_token');

  }

  loadAllUsers() {
    return this.UsersRestApi.GetUserss().subscribe(data => {
      this.users = data;
      this.UserExpiry = this.users.filter(
          data => data._id === this.profile,

      )
    });
  }

  checkout(){
    this.router.navigateByUrl('checkout-page');
  }
}
