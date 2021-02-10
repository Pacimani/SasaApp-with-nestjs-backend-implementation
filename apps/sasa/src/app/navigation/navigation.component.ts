import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Blog, BlogContent } from '@sasa-web/data';
import { FormGroup, FormControl } from '@angular/forms';
@Component({
  selector: 'sasa-web-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit{

  blogContents: BlogContent[] = [];
  routing = true;
  blogForm = new FormGroup({
    title: new FormControl(''),
    message: new FormControl('')
  });
  private blogUrl = '/api/getBlogContents';

  constructor(
    private router: Router,
    private http: HttpClient) {
    
    this.fetchBlogContents();
    this.router.routeReuseStrategy.shouldReuseRoute = function(): boolean {
      return false;
    };

    this.router.events.subscribe((evt) => {
      if (evt instanceof NavigationEnd) {
        // trick the Router into believing its last link wasn't previously loaded
        this.router.navigated = false;
        window.scrollTo(0, 0);
      }
    });
   }

   ngOnInit(): void {
     this.changeRoute();
     this.fetchBlogContents();
   }

  /**
   * @returns current number of blogContent.
   */
  numberOfBlogs(): number {
    return this.blogContents.length;
  }

  fetchBlogContents() {

    this.http.get<BlogContent[]>(this.blogUrl).subscribe((b) => {
      console.warn('Blog are: ', b);
      this.blogContents = b;
    });

  }

  getBlogContent(): BlogContent[] {
    // this.fetchBlogContents();
    return this.blogContents;
  }

  changeRoute(): void {
    this.routing = true;
  }

  newBlogContents(): void {
    this.routing = false;
  }

  /**
   * Return to the previous page.
   */
  back(): void {
    // this.location.back();
    this.changeRoute();
    // this.router.navigate(['./home']);
  }

  submitData(): void{

    const rawTitle = this.blogForm.value.title.trim();
    const rawMessage = this.blogForm.value.message.trim();
    if (!rawTitle || !rawMessage) {
      return;
    }
    const newBlog: Blog = {
      title: rawTitle,
      time: new Date(),
      message: rawMessage,
      comments: []
    };
    const blogContent: BlogContent = {
      id: this.getID(),
      blog: newBlog
    };

    this.http.post('/api/addBlogContent', blogContent).subscribe(
      () => { 
      this.blogForm.reset();
      // this.router.navigate(['./home'])
      this.blogContents.push(blogContent);
    });

  }
  getID(): number {
    return Math.floor(Math.random() * 1000);
  }

  deleteBlog(id: number): void {
    this.http.post('/api/deleteBlog', id).subscribe(() => {
      this.blogContents = this.blogContents.filter(cB => cB.id !== id);
    });
  }
}

