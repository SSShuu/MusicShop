import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { MainComponent } from './components/main/main.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './material/material.module';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ContactComponent } from './components/contact/contact.component';
import { SignInComponent } from './components/Registration/sign-in/sign-in.component';
import { ProductsComponent } from './components/Items/products/products.component';
import { ProductItemComponent } from './components/Items/product-item/product-item.component';
import { ItemDetailsComponent } from './components/Items/item-details/item-details.component';
import { CheckOutComponent } from './components/CheckOut/check-out/check-out.component';
import { CheckOutItemComponent } from './components/CheckOut/check-out-item/check-out-item.component';
import { BasketComponent } from './components/Dialogs/basket/basket.component';
import { FooterComponent } from './components/footer/footer.component';
import { PaymentComponent } from './components/Dialogs/payment/payment.component';
import { SignUpComponent } from './components/Registration/sign-up/sign-up.component';
import { CustomerAccountComponent } from './components/customer/customer-account/customer-account.component';
import { NewReleasesComponent } from './components/Items/new-releases/new-releases.component';
import { ClickOutsideModule } from 'ng-click-outside';
import { TokenInterceptorService } from './shared/token/token-interceptor.service';
import { AdminAddComponent } from './components/Dialogs/admin-add/admin-add.component';
import { AdminEditComponent } from './components/Dialogs/admin-edit/admin-edit.component';
import { DeleteItemComponent } from './components/Dialogs/delete-item/delete-item.component';
import { OrdersComponent } from './components/customer/orders/orders.component';
import { OrderDetailComponent } from './components/customer/order-detail/order-detail.component';
import { CreditCardDirectivesModule } from 'angular-cc-library';
import { ThankYouComponent } from './components/thank-you/thank-you.component';
import { ReciptComponent } from './components/CheckOut/recipt/recipt.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MainComponent,
    NavbarComponent,
    ContactComponent,
    SignInComponent,
    ProductsComponent,
    ProductItemComponent,
    ItemDetailsComponent,
    BasketComponent,
    CheckOutComponent,
    CheckOutItemComponent,
    FooterComponent,
    PaymentComponent,
    SignUpComponent,
    CustomerAccountComponent,
    NewReleasesComponent,
    AdminAddComponent,
    AdminEditComponent,
    DeleteItemComponent,
    OrdersComponent,
    OrderDetailComponent,
    ThankYouComponent,
    ReciptComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    MaterialModule,
    HttpClientModule,
    ClickOutsideModule,
    CreditCardDirectivesModule,
  ],

  entryComponents: [BasketComponent],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
