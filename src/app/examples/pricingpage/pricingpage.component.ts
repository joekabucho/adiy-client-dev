import {Component, Inject, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {FilesService} from "../../shared/files.service";
import {dev} from "../../config/dev";
import {UsersService} from "../../shared/users.service";
import { Allartworks } from '../../shared/allartworks';
import { Blob } from '../../shared/blob';

import { AllartworksService } from '../../shared/allartworks.service';
import { BlobService } from '../../shared/blob.service';
import {DOCUMENT} from "@angular/common";


@Component({
  selector: 'app-pricingpage',
  templateUrl: './pricingpage.component.html',
  styleUrls: ['pricingpage.component.css'],
})
export class PricingpageComponent implements OnInit {

  constructor(@Inject(DOCUMENT) public document: Document,public UsersRestApi: UsersService, private http: HttpClient,public ArtWorksService: AllartworksService,public blopService: BlobService, public FilesRestApi: FilesService) {
    this.getUser();
    this.loadFiles();
    this.getAccessToken();

  }

  focus;
  focus1;
  focus2;
  focus3;
  focus4;

  access_token: any;
  isCollapsed = true;
  fileToUpload: File = null;
  user: String;
  filename: String;
  amount: String;
  tags: String;
  type: String;
  file: any;
  users: any;
  profile: any;

  products: any;

  url = dev.connect;
  Allusers: any = [];
  Allfiles: any = [];

  Allartworks: any = [];


  AllBlobs: any = [];
  Blob: any = [];
  All : any = [];



  ArtworksThumbnail : any = [];
  BlobThumbnail : any = [];


  ArtWorkUrl = 'https://sanaa.adiy.site/api/artwork';



  searchTexts = '';
  public search2 = '';
  Files: any = [];



  ngOnInit() {
    this.loadUsers();
    const body = document.getElementsByTagName('body')[0];
    body.classList.add('landing-page');
    this.loadAllArtWorks();
  }

  selectedTempStatic(item) {
    this.search2 = item.filename;
    console.log(item.filename);
  }

  getAllUsers() {
    this.http.get(this.url + '/api/user/getAll').subscribe((data) => {
      this.users = data;
    });
  }

  getUser() {
    this.profile = localStorage.getItem('profile');
  }

  loadUsers() {
    return this.UsersRestApi.getUsers().subscribe((data: {}) => {
      this.Allusers = data;
    });
  }

  loadFiles() {
    return this.FilesRestApi.GetFiles().subscribe((data: {}) => {
      this.Allfiles = data;
    });
  }
  // Delete employee
  // tslint:disable-next-line:variable-name
  deleteUsers(_id) {
    if (window.confirm('Are you sure, you want to delete?')) {
      this.UsersRestApi.DeleteUsers(_id).subscribe(data => {
        this.loadUsers();
      });
    }
  }

  getAccessToken() {
    this.access_token = localStorage.getItem('access_token');
  }
  logout(){
    localStorage.removeItem('profile');
    localStorage.removeItem('access_token');

  }

  addToCart(item) {
    // console.log(item);
    this.getUserDetails(item);
  }

  goToUrl(id): void {
    let url = 'https://sanaa.adiy.site/' + this.profile + '/' + id + '?token=' + this.access_token ;
    window.open(url,"_blank")
  }
  loadAllArtWorks() {
    let art:any = [];
    return this.ArtWorksService.GetFiles().subscribe(data => {
      art = data;
      this.Allartworks = art.filter(
          data => data.user_id == this.profile

      )
    });
  }

  getUserDetails(item) {
    const amount = parseFloat(item.amount);
    const userID = localStorage.getItem('profile');
    const userDet = {
      userid: userID
    };



    // Delete employee
    // tslint:disable-next-line:variable-name

  }
}
