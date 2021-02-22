import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IndexComponent } from './index/index.component';
import { PresentationComponent } from "./presentation/presentation.component";
import { SectionsComponent } from "./sections/sections.component";
import { ProfilepageComponent } from "./examples/profilepage/profilepage.component";
import { RegisterpageComponent } from "./examples/registerpage/registerpage.component";
import { LandingpageComponent } from "./examples/landingpage/landingpage.component";
import { AboutusComponent } from "./examples/aboutus/aboutus.component";
import { Error500Component } from './examples/500error/500error.component';
import { AccountsettingsComponent } from "./examples/accountsettings/accountsettings.component";
import { BlogpostComponent } from "./examples/blogpost/blogpost.component";
import { BlogpostsComponent } from "./examples/blogposts/blogposts.component";
import { ChatpageComponent } from "./examples/chatpage/chatpage.component";
import { CheckoutpageComponent } from "./examples/checkoutpage/checkoutpage.component";
import { ContactusComponent } from "./examples/contactus/contactus.component";
import { EcommerceComponent } from "./examples/ecommerce/ecommerce.component";
import { ErrorComponent } from "./examples/error/error.component";
import { InvoicepageComponent } from "./examples/invoicepage/invoicepage.component";
import { LoginpageComponent } from "./examples/loginpage/loginpage.component";
import { PricingpageComponent } from "./examples/pricingpage/pricingpage.component";
import { ProductpageComponent } from "./examples/productpage/productpage.component";
import { ResetpageComponent } from "./examples/resetpage/resetpage.component";
import { YoutubeComponent } from "./examples/youtube/youtube.component";
import { ChatsComponent } from "./examples/chats/chats.component";
import { AllTemplatesComponent } from "./examples/all-templates/all-templates.component";




const routes: Routes = [
  { path: "", redirectTo: "/register-page", pathMatch: "full" },
  { path: "index", component: IndexComponent },
  { path: "presentation", component: PresentationComponent },
  { path: "sections", component: SectionsComponent },
  { path: "all-templates", component: AllTemplatesComponent },

  { path: "profile-page", component: ProfilepageComponent },
  { path: "register-page", component: RegisterpageComponent },
  { path: "landing-page", component: LandingpageComponent },
  { path: "about-us", component: AboutusComponent },
  { path: "500-error", component: Error500Component },
  { path: "account-settings", component: AccountsettingsComponent },
  { path: "blog-post", component: BlogpostComponent },
  { path: "blog-posts", component: BlogpostsComponent },
  { path: "chat-page", component: ChatpageComponent },
  { path: "checkout-page", component: CheckoutpageComponent },
  { path: "contact-us", component: ContactusComponent },
  { path: "ecommerce", component: EcommerceComponent },
  { path: "error", component: ErrorComponent },
  { path: "invoice-page", component: InvoicepageComponent },
  { path: "login-page", component: LoginpageComponent },
  { path: "pricing-page", component: PricingpageComponent },
  { path: "product-page", component: ProductpageComponent },
  { path: "youtube", component: YoutubeComponent },
  { path: "reset-page", component: ResetpageComponent },
  { path: "chats", component: ChatsComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      useHash: true,
      scrollPositionRestoration: "enabled",
      anchorScrolling: "enabled",
      scrollOffset: [0, 64]
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
