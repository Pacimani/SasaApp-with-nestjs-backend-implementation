import { BlogContent } from '@sasa-web/data';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  blogContents: BlogContent[] = [];

  getBlogContents(): BlogContent[] {
    return this.blogContents;
  }

  addBlogContent(blogContent: BlogContent) {
    this.blogContents.push(blogContent);
  }

  updateBlogContent(blogContent: BlogContent) {

    const id = blogContent.id;
    const blogIndex = this.blogContents.findIndex(blogC => blogC.id == id);
    if(blogIndex > -1){
      this.blogContents[blogIndex] = blogContent;
      console.warn('Blog is replaced');
      return blogContent;
    }

    throw new HttpException('BlogContent not found', HttpStatus.NOT_FOUND);
    
  }
  getCurrentBlog(id: number) {
    return this.blogContents.find(bContent => bContent.id == id);
  }

  getNumBlog() {
    return this.blogContents.length;
  }

  deleteBlog(id: number) {
    this.blogContents.filter( cB => cB.id !== id);
  }
}