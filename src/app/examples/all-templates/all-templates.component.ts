import {Component, Inject, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { DOCUMENT } from '@angular/common';
import {FilesService} from "../../shared/files.service";
import {dev} from "../../config/dev";
import {UsersService} from "../../shared/users.service";
import { Allartworks } from '../../shared/allartworks';
import { Blob } from '../../shared/blob';
import 'datatables.net-buttons/js/buttons.flash';
import 'datatables.net-buttons/js/buttons.html5';
import 'datatables.net-buttons/js/buttons.print';
import * as $ from 'jquery';
import 'datatables.net';
import 'datatables.net-buttons';

import { AllartworksService } from '../../shared/allartworks.service';
import { BlobService } from '../../shared/blob.service';


@Component({
  selector: 'app-all-templates',
  templateUrl: './all-templates.component.html',
  styleUrls: ['./all-templates.component.css'],
})
export class AllTemplatesComponent implements OnInit {
  public UserExpiry: any;
  public expiryDate: Date;
  public isActive: boolean;

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

  public selectedFiles = [];
  public art:any = [];
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
  access_token: any;

  products: any;

  url = dev.connect;
  Allusers: any = [];
  public Allfiles: any = [];

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
    this.loadAllUsers();
    this.loadFiles();
    this.loadProfile();
  }

  selectedTempStatic(item) {
    this.search2 = item.filename;
  }

  getAllUsers() {
    this.http.get(this.url + '/api/user/getAll').subscribe((data) => {
      this.users = data;
    });
  }

  getUser() {
    this.profile = localStorage.getItem('profile');
  }
  getAccessToken() {
    this.access_token = localStorage.getItem('access_token');
  }

  loadProfile() {
    return this.UsersRestApi.GetUserss().subscribe(data => {
      this.users = data;
      this.UserExpiry = this.users.filter(
          data => data._id === this.profile,

      )
      console.log(this.UserExpiry);
      this.expiryDate = new Date(this.UserExpiry[0].next_payment_date);
    });
  }
  loadUsers() {
    return this.UsersRestApi.getUsers().subscribe((data: {}) => {
      this.Allusers = data;
    });
  }

  loadFiles() {
    return this.FilesRestApi.GetFiles().subscribe((data: {}) => {
      this.Allfiles = data;
      let i;
      for ( i = 0; i < this.Allfiles.length; i++) {
        this.selectedFiles[i] = this.Allfiles[i].artworkid;
      }
      const setFiles = new Set(this.selectedFiles);
      return this.ArtWorksService.GetFiles().subscribe(data => {
        this.art = data;
        this.Allartworks = this.art.filter(
            data => !setFiles.has(data.id)
        )
      });
    });
  }

  goToUrl(id): void {
    this.getAccessToken();
    if (this.access_token !== null){
      let url = 'https://sanaa.adiy.site/' + this.profile + '/' + id + '?token=' + this.access_token ;
      window.open(url,"_blank")
    }

  }
  // Delete employee
  // tslint:disable-next-line:variable-name
  public currentDate: Date;
  deleteUsers(_id) {
    if (window.confirm('Are you sure, you want to delete?')) {
      this.UsersRestApi.DeleteUsers(_id).subscribe(data => {
        this.loadUsers();
      });
    }
  }


  logout(){
    localStorage.removeItem('profile');
    localStorage.removeItem('access_token');

  }

  addToCart(item) {
    this.getUserDetails(item);
  }

  loadAllArtWorks() {
  }

  loadAllUsers() {
    let users:any = [];
    return this.UsersRestApi.GetUserss().subscribe(data => {
      users = data;
      this.UserExpiry = users.filter(
          data => data._id == this.profile,

      )
      this.currentDate = new Date(Date.now());
      this.expiryDate = new Date(this.UserExpiry[0].next_payment_date);
      if (this.currentDate < this.expiryDate){
        this.isActive = true;
      }
     else{
        this.isActive = false;
      }
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
