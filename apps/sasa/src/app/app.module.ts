import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import {AmplifyAngularModule} from 'aws-amplify-angular';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { DisplayBlogComponent } from './display-blog/display-blog.component';
import { HomeBlogComponent } from './home-blog/home-blog.component';
import { NavigationComponent } from './navigation/navigation.component';

@NgModule({
  declarations: [AppComponent, DisplayBlogComponent, HomeBlogComponent, NavigationComponent],
  imports: [BrowserModule, 
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    AmplifyAngularModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
