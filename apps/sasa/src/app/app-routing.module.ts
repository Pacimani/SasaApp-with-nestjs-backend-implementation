import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { DisplayBlogComponent } from './display-blog/display-blog.component';
import { HomeBlogComponent } from './home-blog/home-blog.component';

const routes: Routes = [
  { path: 'home', component: HomeBlogComponent },
  { path: 'display/:id', component: DisplayBlogComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' }
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes),
    CommonModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
