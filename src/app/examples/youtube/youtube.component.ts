import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgxSpinnerService } from 'ngx-spinner';
import { YoutubeService } from '../../shared/youtube.service';
import { map, tap, takeUntil} from 'rxjs/operators';
import { Subject } from 'rxjs';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';
import { Router } from '@angular/router';







@Component({
  selector: 'app-youtube',
  templateUrl: './youtube.component.html',
  styleUrls: ['./youtube.component.scss','./style.css']
})
export class YoutubeComponent implements OnInit {

  iframe: any;
  urlSafe: SafeResourceUrl;
  videos: any[];
  filename: any;
  private unsubscribe$: Subject<any> = new Subject();

  

  constructor(public http: HttpClient,private spinner: NgxSpinnerService, private youTubeService: YoutubeService ,public sanitizer: DomSanitizer) { }

  ngOnInit() {
    let body = document.getElementsByTagName('body')[0];
    body.classList.add('pricing-page');

    let logoImage: any = document.getElementById('brand-logo');
    logoImage.src = 'assets/img/brand/logo.png';
    this.spinner.show()
    setTimeout(()=>
    {
      this.spinner.hide()
    },3000)
    this.videos = [];
    this.youTubeService
      .getVideosForChanel('UCN0YbL-181uwiTewjS6YxSQ', 15)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(lista => {
        for (let element of lista["items"]) {
          this.videos.push(element);
        }

      });
  }


  encode(filename) {
    console.log(filename);
    const imgUrl = filename.split('8000')[1];
   //  this.iframe = ('https://www.photopea.com#' + encodeURI('{"files":["https://server.adiy.site/insta.jpg"],"environment": {}}')); 
    this.iframe  = ('https://www.youtube.com/embed/' + filename);
    this.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(this.iframe);
   // console.log(en);
 }

}
