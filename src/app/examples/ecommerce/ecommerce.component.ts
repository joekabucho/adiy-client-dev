import { Component, OnInit, OnDestroy ,Inject} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { dev } from '../../config/dev';
import { FilesService } from '../../shared/files.service';
import { Files } from '../../shared/files';
import { FilterPipe } from './app.filter';
import {NgbTypeahead} from '@ng-bootstrap/ng-bootstrap';
import { UsersService } from '../../shared/users.service';
import { Artworks } from '../../shared/artworks';
import { AllartworksService } from '../../shared/allartworks.service'
import { Allartworks } from '../../shared/allartworks';
import { Blob } from '../../shared/blob';

import { BlobService } from '../../shared/blob.service';
import {any} from "codelyzer/util/function";
import {DOCUMENT} from "@angular/common";





@Component({
  selector: 'app-ecommerce',
  templateUrl: 'ecommerce.component.html',
  styleUrls: [ './ecommerce.component.css']
})
export class EcommerceComponent implements OnInit, OnDestroy {

  constructor(@Inject(DOCUMENT) public document: Document,public UsersRestApi: UsersService,private http: HttpClient,public ArtWorksService: AllartworksService , public FilesRestApi: FilesService,public blopService: BlobService) {
     this.getUser();
      this.getAllUsers();
     this.loadFiles();
     this.getSelected();

  }

  selected_games: { names: string; id: number; selected: boolean; }[];
  names: string;
  searchText = '';
  selected_count = 0;
  stringifiedData: any;
  Allartworks: any = [];


    AllBlobs: any = [];
    Blob: any = [];
    All : any = [];



    ArtworksThumbnail : any = [];
    BlobThumbnail : any = [];


    BlobUrl = 'https://sanaa.adiy.site/api/blob';
    ArtWorkUrl = 'https://sanaa.adiy.site/api/artwork';



    public filters = [
    {
      names: 'facebook',

      id: 1,
      selected: false
    }, {
      names: 'whatsapp/mobile',
       id: 2,
      selected: false
    }, {
      names: 'youtube',
      id: 3,
      selected: false
    }, {
      names: 'instagram',

      id: 4,
      selected: false
    }, {
      names: 'twitter',

       id: 5,
      selected: false
    }, {
      names: 'flier/poster',

      id: 6,
      selected: false},
     {
      names: 'logos',

       id: 7,
      selected: false
    },
      {
          names: 'cards',

          id: 8,
          selected: false
      }
  ];

  focus;
  focus1;
  focus2;
  focus3;

    users: any;
    products: any;
  url = dev.connect;
  profile: any;
  userDetails: any;
  cart: any = [];
  itemurl: any;
  name: any;
  color: any = 'white';
  colors: any = ['white', 'red', 'blue', 'green'];
  vertical: any;
  horizontal: any;
  Files: any = [];




  title = 'angular-text-search-highlight';
  searchTexts = '';
    public search2 = '';





  // Getting Selected Games and Count
  getSelected() {
     this.selected_games =  this.filters.filter( s => {
          return s.selected;
        });
     this.selected_count = this.selected_games.length;
     // alert(this.selected_games);
  }

  // Clearing All Selections
  clearSelection() {
    this.searchText = '';
    this.filters =  this.filters.filter( g => {
          g.selected = false;
          return true;
        });
    this.getSelected();
  }

  // Delete Single Listed Game
  deleteGame(id: number) {
    this.searchText = '';
    this.filters =  this.filters.filter( g => {
          if (g.id == id) {
          g.selected = false;
          }

          return true;
        });
    this.getSelected();
  }

  clearFilter() {
    this.searchText = '';
  }

  ngOnInit() {
    this.getUsersDesigns();
    this.loadFiles();
    this.getUser();
  }

    getAllUsers() {
        this.http.get(this.url + '/api/user/getAll').subscribe((data) => {
            this.users = data;
        });
    }

    selectedTempStatic(item) {
        this.search2 = item.filename;
        console.log(item.filename);
    }

  ngOnDestroy() {
    const body = document.getElementsByTagName('body')[0];
    body.classList.remove('ecommerce-page');
  }

    goToUrl(id): void {
        let url = 'https://sanaa.adiy.site/' + this.profile + '/' + id ;
        window.open(url,"_blank")
    }
  loadmore() {
    (document.getElementById('loadmore').style.display = 'block');
    (document.getElementById('loadbtn').style.display = 'none');
  }
  less() {
    (document.getElementById('loadmore').style.display = 'none');
    (document.getElementById('loadbtn').style.display = 'block');
  }
  getUsersDesigns() {
    const payload = {
      userid: this.profile
    };
    return this.http.post(this.url + '/api/files/user', payload).subscribe((data) => {
      this.products = data;
    });
  }
  getUser() {
    this.profile = localStorage.getItem('profile');
   }


   addToCart(item,itemamount) {
     this.getUserDetails(item,itemamount);
   }
  getUserDetails(item,itemamount) {
    const amount = parseFloat(itemamount);
    const userID = localStorage.getItem('profile');
    const userDet = {
      userid: userID
    };



    this.http.post(this.url + '/api/cart/user', userDet).subscribe(cart => {
      this.cart = cart;
      if (this.cart.length > 0) {
        const items = this.cart[0].items;
        let amountc = this.cart[0].amount;
        amountc = amountc + amount;
        items.push(item);
        this.cart[0].items = items;
        this.cart[0].amount = amountc;
        this.http.post(this.url + '/api/cart/add', this.cart[0]).subscribe((response) => {
          console.log(response);
          alert('Added item to cart');
      });
     } else {
        // console.log("Doesnt Exist")
        const items = [];
        items.push(item);
        const payload = {
          user: userID,
          items,
          amount,
          status: 'Pending'
        };
        this.http.post(this.url + '/api/cart', payload).subscribe((response) => {
          alert('Added item to cart');
        });
      }

    }, error => {
       // console.log("Doesnt Exist")
       const items = [];
       items.push(item);
       const payload = {
         user: userID,
         items,
         amount,
         status: 'Pending'
       };
       this.http.post(this.url + '/api/cart', payload).subscribe((response) => {
         alert('Added item to cart');
       });
  });
  }
  editTemplate(product) {

  }
  myCanvas() {
    const c = document.getElementById('myCanvas') as HTMLCanvasElement;
    const ctx = c.getContext('2d');
    const img = document.getElementById('scream') as HTMLCanvasElement;
    ctx.font = '30px Roboto Condensed';
    ctx.fillStyle = this.color;
    ctx.drawImage(img, 0, 0);
    ctx.fillText(this.name, this.vertical, this.horizontal);
  }
  download() {

  }
  loadFiles() {
     let ApiFiles:any = [];
      return this.FilesRestApi.GetFiles().subscribe((data: {}) => {
      ApiFiles = data;
      this.Files = ApiFiles.filter (
          data => data.user===this.profile,

    )
        console.log(this.Files);
    });
  }

    logout(){
        localStorage.removeItem('profile');
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
