import {Component, OnInit, OnDestroy, ViewChild} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import { dev } from '../../config/dev';
import { UsersService } from '../../shared/users.service';
import { FilesService } from '../../shared/files.service';
import { ArtWorksService } from '../../shared/artworks.service'
import { Artworks } from '../../shared/artworks';
import { AllartworksService } from '../../shared/allartworks.service'
import { Files } from '../../shared/files';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';




@Component({
  selector: 'app-landingpage',
  templateUrl: 'landingpage.component.html',
  styleUrls: ['./landing.component.css'],
})
export class LandingpageComponent implements OnInit, OnDestroy {


  dtOptions: any = {};
  focus;
  focus1;
  focus2;
  focus3;
  focus4;
  isCollapsed = true;
  fileToUpload: File = null;
  user: String;
  name: String;
  filename: String;
  amount: String;
  tags: String;
  type: String;
  file: any;
  artworkid: String;
  users: any = [];
  profile: any;

  url = dev.connect;
  Allusers: any = [];
  Allfiles: any = [];
  Allartworks: any = [];
  Filteredartworks: any = [];

  assignArtworkForm: FormGroup;


  data: Artworks;

  filedata: Files;
  public expirationForm: FormGroup;
  public selectedUser: any;
  public isPaid: any = [];
  public subscriptions: any = [];
  public publicArtworks: any = [];
  private userArtworks: any;
  private userToFilter: any;
  public filteredUserArtworks = [];


  constructor(      public restApi: ArtWorksService,    private fb: FormBuilder,
                    public UsersRestApi: UsersService, public FilesRestApi: FilesService,public ArtWorksService: AllartworksService , private http: HttpClient) {
    this.getAllUsers();
    this.getUser();
    this.loadFiles();
    this.data = new Artworks();
    this.filedata = new Files();

  }

  ngOnInit() {
    this.loadUsers();
    this.loadAllArtWorks();
    const body = document.getElementsByTagName('body')[0];
    body.classList.add('landing-page');

    console.log(this.Allartworks);
    console.log(this.Allusers);
    this.dtOptions = {
      pagingType: 'full_numbers',
      processing: true,
      pageLength: 10,
      dom: 'Bfrtip',
      buttons: [
        'copy', 'csv', 'excel', 'pdf', 'print'
      ],
    };
    this.assignArtworkForm = this.fb.group({
      'uploadedby': this.profile,
      'amount': [null, Validators.required],
      'type': [null, Validators.required],
      'tags': [null, Validators.required],
      'filename': [null, Validators.required],
      'user': [null, Validators.required],
      'artworkid': [null, Validators.required],
    });
    this.expirationForm = this.fb.group({
      'next_payment_date': [null , Validators.required],
      'is_paid': true,
    });
  }
  ngOnDestroy() {
    const body = document.getElementsByTagName('body')[0];
    body.classList.remove('landing-page');
  }
  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
  }
  submitFile(){
    const payload = {
      'uploadedby': this.assignArtworkForm.get('uploadedby').value,
      'amount': this.assignArtworkForm.get('amount').value,
      'type': this.assignArtworkForm.get('type').value,
      'tags': this.assignArtworkForm.get('tags').value,
      'artworkid': this.assignArtworkForm.get('artworkid').value,
      'filename': this.assignArtworkForm.get('filename').value,
      'user': this.assignArtworkForm.get('user').value,
    };
    this.FilesRestApi.createFiles(payload)
        .subscribe(
            () => {
              if (window.confirm('Are you sure, you want to assign this template to this user?')) {
                console.log('successfully submitted');
              }
            },
            (error: HttpErrorResponse) => {
              console.log('unable to submit');
            },
        );
  }

  updateUser(user){
    this.selectedUser = user._id;
  }
  expirationDate(){
    const payload = {
      'next_payment_date': this.expirationForm.get('next_payment_date').value,
      'is_paid': true,
    };
    this.UsersRestApi.UpdateUsers( this.selectedUser,payload)
        .subscribe(
            () => {
              this.getAllUsers();
            },
            (error: HttpErrorResponse) => {
              console.log('unable to submit');
            },
        );
  }
  getAllUsers() {
    this.http.get(this.url + '/api/user/getAll').subscribe((data) => {
       this.users = data;
       this.subscriptions = this.users.filter(u => u.is_paid === true)
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

  loadAllArtWorks() {
    let selectedFilter:any = [];
    return this.ArtWorksService.GetFiles().subscribe((data: {}) => {
      this.Allartworks = data;
      selectedFilter = data;
      this.Filteredartworks = selectedFilter.filter(
          data => JSON.stringify(data.blob_thumbnail) === localStorage.getItem('selectedArtwork'),
          this.loadAllArtWorks()
      )
      this.publicArtworks = selectedFilter.filter(
          data =>data.user_id === 'public'
      )
    });
  }
  changedItem(artid) {
    localStorage.setItem('selectedArtwork', JSON.stringify(artid));
  }


  // Delete employee
  // tslint:disable-next-line:variable-name
  deleteUsers(_id)  {
    if (window.confirm('Are you sure, you want to delete?')) {
      this.UsersRestApi.DeleteUsers(_id).subscribe(data => {
        this.loadUsers();
      });
    }
  }

  loadFiles() {
    return this.FilesRestApi.GetFiles().subscribe((data: {}) => {
      this.Allfiles = data;
    });
  }

  submitForm() {
    this.restApi.createArtwork(this.data).subscribe((response) => {
       console.log("art work is created")
    });

  }

  logout(){
    localStorage.removeItem('profile');
  }
  submitFileForm() {
    this.FilesRestApi.createFiles(this.filedata).subscribe((response) => {
      console.log(response)
    });

  }

  // Delete employee
  // tslint:disable-next-line:variable-name
  deleteFiles(_id)  {
    if (window.confirm('Are you sure, you want to delete?')) {
      this.FilesRestApi.DeleteFiles(_id).subscribe(data => {
        this.loadFiles();
      });
    }
  }
}
