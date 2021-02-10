import { Body, Controller, Get, Post, Headers, Put, Delete } from '@nestjs/common';
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
    const id = Number(headers.header);
    return this.appService.getCurrentBlog(id);
  }

  @Get('getNumBlog')
  getNumBlog(){
    return this.appService.getNumBlog();
  }

  @Put('updateBlogContent')
  async updateBlogContent(@Body() blogContent: BlogContent) {
    return this.appService.updateBlogContent(blogContent);
  }

  @Delete('deleteBlog')
  async deleteBlog(@Headers() headers) {
    const id = Number(headers.header);
    return this.appService.deleteBlog(id);
  }

  @Post('addBlogContent')
  async addBlogContent(@Body() blogContent: BlogContent) {
    console.warn('This is from post: ', blogContent.id);
    return this.appService.addBlogContent(blogContent);
  }
}
