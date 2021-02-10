import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BlogContent, BlogComment } from '@sasa-web/data';
@Component({
  selector: 'sasa-web-display-blog',
  templateUrl: './display-blog.component.html',
  styleUrls: ['./display-blog.component.css']
})
export class DisplayBlogComponent implements OnInit {

  commentForm = new FormGroup({
    message: new FormControl('')
  });

  control = false;
  numberOfBlog = 0;
  blogContent!: BlogContent;
  successComment = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private http: HttpClient,
    private router: Router){ }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.getCurrentBlog(params.id);
    });
   
  }

  getCurrentBlog(id: string) {

    const headers = new HttpHeaders().append('header', id);
    const params = new HttpParams().append('param', id);
  
    this.http.get<BlogContent>('/api/getCurrentBlog', {headers, params})
    .subscribe((blogC) => {
      this.blogContent = blogC;
    });
  
    this.http.get<number>('/api/getNumBlog')
    .subscribe((numBlog) => {
      if (numBlog == 0) {
        this.router.navigate(['./home']);
      }
    });
  }

  /**
   * Request the blogContent currently on this route from the server.
   */
  newComment(): void{
    const comment = this.commentForm.value.message.trim();
    if (!comment) {
      return;
    }
    const newComment: BlogComment = {
      time: new Date(),
      message: comment
    };
    this.blogContent.blog.comments.push(newComment);
    this.http.put('/api/updateBlogContent', this.blogContent)
      .subscribe((bContent: BlogContent) => {

        this.blogContent = bContent;
        this.commentForm.reset();
        });
  }

  /**
   * Control the Display of blogContent's comments' thread.
   */
  commentControl(): void{
    this.control = !this.control;
  }

  /**
   * @returns list of comment associated with this given blogContent.
   */
  getBlogComments(): BlogComment[]{
    return this.blogContent.blog.comments;
  }
}
