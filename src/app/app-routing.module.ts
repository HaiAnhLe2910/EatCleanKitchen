import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ContentLayoutComponent} from "./layout/content-layout/content-layout.component";
import {HomeComponent} from "./modules/home/home.component";
import {ContactComponent} from "./modules/contact/contact.component";
import {AboutComponent} from "./modules/about/about.component";

const routes: Routes = [
  {
    path: '', component: ContentLayoutComponent, children: [
      {path: 'home', component: HomeComponent},
      {path: 'about', component: AboutComponent},
      {path: 'contact', component: ContactComponent}
    ]
  },
  {path: '', redirectTo: '/home', pathMatch: 'full'}
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
