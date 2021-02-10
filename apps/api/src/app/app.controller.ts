import { Body, Controller, Get, Post, Headers, Put, Param } from '@nestjs/common';
import { BlogContent } from '@sasa-web/data';

import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('getBlogContents')
  async getBlogContents() {
    console.warn('This is from get request ');
    return this.appService.getBlogContents();
  }

  @Get('getCurrentBlog')
  getCurrentBlog(@Headers() headers) {
    console.warn('This are headers: ', headers.header);
    const id = Number(headers.header);
    return this.appService.getCurrentBlog(id);
    //return this.appService.getCurrentBlog(id);
  }

  @Get('getNumBlog')
  getNumBlog(){
    return this.appService.getNumBlog();
  }
  @Put('updateBlogContent')
  async updateBlogContent(@Body() blogContent: BlogContent) {
    console.warn('This is update blog ', blogContent, ' comments are ', blogContent.blog.comments );
    // return;
    // need to replace this with a update in the service
    return this.appService.updateBlogContent(blogContent);
  }
  @Post('deleteBlog')
  async deleteBlog(@Param('id') id: number) {
    console.log('the id is ', id);
    return this.appService.deleteBlog(id);
  }

  @Post('addBlogContent')
  async addBlogContent(@Body() blogContent: BlogContent) {
    console.warn('This is from post: ', blogContent.id);
    return this.appService.addBlogContent(blogContent);
  }
}
