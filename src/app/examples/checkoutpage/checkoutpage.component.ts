import { Component, OnInit, OnDestroy } from "@angular/core";
import Choices from 'choices.js';
import { HttpClient } from '@angular/common/http';
import { dev } from '../../config/dev';
import {catchError} from "rxjs/operators";

@Component({
  selector: "app-checkoutpage",
  templateUrl: "checkoutpage.component.html"
})
export class CheckoutpageComponent implements OnInit, OnDestroy {
  url = dev.connect;
  cart:any;
  cartItems: any = [];
  phone: any;
  totalAmount: any;
  ipayUrl: any;
  transactionId: any;
  cartId : any;
  presentPaidTemplates = false;
  accesTokenUrl = "https://pay.adiy.site/access_token" ;


  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.checkPaidTemplates();
    this.getCartItems();
    var body = document.getElementsByTagName("body")[0];
    body.classList.add("checkout-page");
    var choicesSingle = document.getElementById('choices-single-default');
    if (choicesSingle) {
      new Choices(choicesSingle, {
        searchEnabled: false,
      });
    }
  }
  ngOnDestroy(){
    var body = document.getElementsByTagName("body")[0];
    body.classList.remove("checkout-page");
  }
  getCartItems(){
    const userID = localStorage.getItem('profile');
    const userDet ={
      userid: userID
    }
    this.http.post(this.url+'/api/cart/user', userDet).subscribe((cart)=>{
      this.cart = cart;
      this.cartItems = this.cart[0].items[0];
      console.log(this.cartItems);
      this.totalAmount = this.cart[0].amount;
    })
  }
  removeFromCart(item){
    const index = this.cart[0].items.indexOf(item);
    this.cart[0].items.splice(index,1);
    this.cart[0].amount = this.cart[0].amount - item.amount;
    this.http.post(this.url+'/api/cart/add', this.cart[0]).subscribe((response)=>{
      //console.log(response);
      this.getCartItems();
    })
    // console.log(this.cart[0]);
    if(this.cart[0].items.length<1){
      this.http.delete(this.url+'/api/cart/'+this.cart[0]._id).subscribe((response)=>{
        console.log(response);
        if(response){
          location.reload();
        }
      })
       
    }
  }
  mpesaCheckout(amount, cart){
    const userID = localStorage.getItem('profile');
    this.transactionId = cart;
    localStorage.setItem('latestTransactionId', this.transactionId);
    this.cartId = cart;
    if(this.phone!=undefined || this.phone !=null){ 
    const payload ={
       _id: cart,
       phone: "+"+this.phone.toString(),
       amount: amount
    }
    const options = {
      live: "0",
      oid: cart,
      inv: '112020102292999',
      ttl:  amount,
      tel:  "254"+this.phone.toString(),
      eml: 'muindegeofrey@gmail.com',
      vid: 'genkey',
      curr: 'KES',
      p1: '',
      p2 : '',
      p3: '',
      p4: '5',
      cbk:"http://platform.adiy.site/#/pricing-page?id="+userID,
      lbk: "http://platform.adiy.site/#/checkout-page",
      cst: '1',
      crl: "0"
     }
     console.log(options);
    
        this.http.post(this.url + '/api/cart/card', options).subscribe((response)=>{
          var data;
          if(response){
            data = response
            //replace this with a modal to guide on the payment process and show more information about payment policy even before payment etc

            alert("Payment Request Received, When you click Ok you will be redirected to ipay to finalize payment, once you have paid, come back to this page and click the button 'Download and Customise Your Templates' to download and view your templates. Thank you!");
            
            // handle this under the Ok button on the modal

            window.open(data.headers.location, '_blank');
            window.focus();
            this.updateCartValues();
            location.reload();
          }
        })
    }else{
      alert("Please Enter Phone Number")
    }
  }
  updateCartValues() {
    // this.activeroute.queryParamMap.subscribe(params => {
       const userid = localStorage.getItem('profile');
       if (userid != null) {
         const payload = {
           userid: userid,
           status: "Processing"
         };
         this.http.post(this.url + '/api/cart/updatestatus', payload ).subscribe(cart => {
         });
       } else {
         console.log('No userid was passed, ... aborting');
       }
    // });
 }

 checkPaidTemplates(){
  const userid = localStorage.getItem('profile');
  const payload = {
    userId: userid
  }
  this.http.post(this.url + '/api/cart/paymentsbyuser', payload ).subscribe(paid_templates => {
    let data: any; data = paid_templates;
    if(data.length>0){
      
      this.presentPaidTemplates = true;

    }
  }, error => this.presentPaidTemplates = false);
  
 }
 openCustomizeMyTemplates(){
   location.href = "http://platform.adiy.site/#/pricing-page?id="+localStorage.getItem('profile')+"&tr="+localStorage.getItem('latestTransactionId');
 }

 setLocalStorage(status){
   localStorage.setItem("amount",this.totalAmount);
   localStorage.setItem("status",status);
   localStorage.setItem("phonenumber",this.phone);
 }

 lipaNaMpesa(amount){
      console.log(amount);
    let stkUrl = "https://pay.adiy.site/stk?phone=" + this.phone + "&amount=" + JSON.stringify(amount);
   this.http.get(this.accesTokenUrl).subscribe((response)=> {
         var data;
         if (response) {
           data = response
           console.log(response)
             alert("Payment Request Received,and sent to your device please proceed to pay");

         } else {
           console.log('access token not generated')
         }
       }
   );

     this.http.get(stkUrl).subscribe((response)=> {
         var data;
         if (response) {
             data = response
             console.log(response)
         } else {
             console.log('access token not generated')
         }
     }
     );
 }
}
