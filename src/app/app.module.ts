import { TagInputModule } from 'ngx-chips';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // this is needed!
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { FilterPipe } from './examples/ecommerce/app.filter';
import { HighlightFilterPipe } from './pipes/filter.pipe';

//I keep the new line
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ProgressbarModule } from 'ngx-bootstrap/progressbar';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { AlertModule } from 'ngx-bootstrap/alert';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { ModalModule } from 'ngx-bootstrap/modal';
import { PopoverModule } from 'ngx-bootstrap/popover';
import { TimepickerModule } from 'ngx-bootstrap/timepicker';
import { MatChipsModule } from '@angular/material/chips';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PresentationModule } from './presentation/presentation.module';

import { IndexComponent } from './index/index.component';
import { SectionsComponent } from './sections/sections.component';
import { ProfilepageComponent } from './examples/profilepage/profilepage.component';
import { RegisterpageComponent } from './examples/registerpage/registerpage.component';
import { LandingpageComponent } from './examples/landingpage/landingpage.component';
import { AboutusComponent } from './examples/aboutus/aboutus.component';
import { Error500Component } from './examples/500error/500error.component';
import { AccountsettingsComponent } from './examples/accountsettings/accountsettings.component';
import { BlogpostComponent } from './examples/blogpost/blogpost.component';
import { BlogpostsComponent } from './examples/blogposts/blogposts.component';
import { ChatpageComponent } from './examples/chatpage/chatpage.component';
import { CheckoutpageComponent } from './examples/checkoutpage/checkoutpage.component';
import { ContactusComponent } from './examples/contactus/contactus.component';
import { EcommerceComponent } from './examples/ecommerce/ecommerce.component';
import { ErrorComponent } from './examples/error/error.component';
import { InvoicepageComponent } from './examples/invoicepage/invoicepage.component';
import { LoginpageComponent } from './examples/loginpage/loginpage.component';
import { PricingpageComponent } from './examples/pricingpage/pricingpage.component';
import { ProductpageComponent } from './examples/productpage/productpage.component';
import { ResetpageComponent } from './examples/resetpage/resetpage.component';
import { YoutubeComponent } from './examples/youtube/youtube.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { PictureUploadComponent } from './components/picture-upload/picture-upload.component';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { NgxSpinnerModule } from 'ngx-spinner';
import { HighlightDirective } from './directives/highlight.directive';
import { NoRightClickDirective } from './directives/no-right-click.directive';
import { NgxTypeaheadModule } from 'ngx-typeahead';
import { CookieService } from 'angular2-cookie/services/cookies.service';
import { ChatsComponent } from './examples/chats/chats.component';
import { AllTemplatesComponent } from './examples/all-templates/all-templates.component';

import { DataTablesModule } from 'angular-datatables';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';


//I keep the new line
@NgModule({
	declarations: [
		AppComponent,
		IndexComponent,
		ProfilepageComponent,
		RegisterpageComponent,
		LandingpageComponent,
		SectionsComponent,
		AboutusComponent,
		Error500Component,
		AccountsettingsComponent,
		BlogpostComponent,
		BlogpostsComponent,
		ChatpageComponent,
		CheckoutpageComponent,
		ContactusComponent,
		EcommerceComponent,
		ErrorComponent,
		InvoicepageComponent,
		LoginpageComponent,
		PricingpageComponent,
		ProductpageComponent,
		ResetpageComponent,
		YoutubeComponent,
		NavbarComponent,
		FooterComponent,
		PictureUploadComponent,
		HighlightDirective,
		NoRightClickDirective,
		FilterPipe,
		HighlightFilterPipe,
		YoutubeComponent,
		ChatsComponent,
		AllTemplatesComponent
	],
    imports: [
        CommonModule,
        FormsModule,
        HttpClientModule,
        NgxSpinnerModule,
		DataTablesModule,
		RouterModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        NgxTypeaheadModule,
        //NotificationService,
        BsDropdownModule.forRoot(),
        ProgressbarModule.forRoot(),
        TooltipModule.forRoot(),
        TimepickerModule.forRoot(),
        PopoverModule.forRoot(),
        CollapseModule.forRoot(),
        TagInputModule,
        PresentationModule,
        TabsModule.forRoot(),
        PaginationModule.forRoot(),
        MatChipsModule,
        AlertModule.forRoot(),
        BsDatepickerModule.forRoot(),
        CarouselModule.forRoot(),
        ModalModule.forRoot(),
        ToastrModule.forRoot({
            timeOut: 1000,
            positionClass: 'toast-top-right',
            preventDuplicates: true,
        }),
        ReactiveFormsModule,
        ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
    ],
	providers: [CookieService],
	bootstrap: [AppComponent]
})
export class AppModule {
}
