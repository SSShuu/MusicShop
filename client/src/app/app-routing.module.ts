import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BasketComponent } from './components/Dialogs/basket/basket.component';
import { CheckOutComponent } from './components/CheckOut/check-out/check-out.component';
import { ContactComponent } from './components/contact/contact.component';
import { CustomerAccountComponent } from './components/customer/customer-account/customer-account.component';
import { ItemDetailsComponent } from './components/Items/item-details/item-details.component';
import { MainComponent } from './components/main/main.component';
import { PaymentComponent } from './components/Dialogs/payment/payment.component';
import { ProductsComponent } from './components/Items/products/products.component';
import { SignInComponent } from './components/Registration/sign-in/sign-in.component';
import { SignUpComponent } from './components/Registration/sign-up/sign-up.component';
import { AccountGuard } from './components/Guards/account.guard';
import { CheckoutGuard } from './components/Guards/checkout.guard';
import { ThankYouComponent } from './components/thank-you/thank-you.component';

const routes: Routes = [
  { path: '', component: MainComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'sign-in', component: SignInComponent },
  { path: 'item-details', component: ItemDetailsComponent },
  { path: 'basket', component: BasketComponent },
  {
    path: `products/:${localStorage.getItem('categoryName')}`,
    component: ProductsComponent,
  },
  {
    path: `product-item/:${localStorage.getItem('itemID')}`,
    component: ItemDetailsComponent,
  },
  {
    path: `checkout`,
    component: CheckOutComponent,
    canActivate: [CheckoutGuard],
  },
  {
    path: `checkout/payment`,
    component: PaymentComponent,
    canActivate: [CheckoutGuard],
  },
  { path: `sign-up`, component: SignUpComponent },
  {
    path: `customer/account`,
    component: CustomerAccountComponent,
    canActivate: [AccountGuard],
  },
  {
    path: `confirmation`,
    component: ThankYouComponent,
  },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
