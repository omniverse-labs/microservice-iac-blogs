import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Put } from "@nestjs/common";
import BlogService from './blog.service';
import CreateBlogDto from "./models/createBlog.model";
import BlogModel from './models/blog.model';
import UpdateBlogDto from "./models/updateBlog.model";


@Controller('api/v1/blogs')
export class BlogsController {
    constructor(private readonly blogService: BlogService) { }

    @Post()
    async createBlog(@Body() createBlogDto: CreateBlogDto): Promise<BlogModel> {
        try {
            const response = await this.blogService.createBlog(createBlogDto.title, createBlogDto.text);
            return response;
        } catch (exception) {
            console.log(exception);
            throw exception;
        }
    }

    @Get()
    async getAll(): Promise<BlogModel[]> {
        try {
            const response = await this.blogService.getBlogs();
            return response;
        } catch (exception) {
            console.log(exception);
            throw exception;
        }
    }

    @Get(':id')
    async getBlogById(@Param('id') id: string): Promise<BlogModel> {
        try {
            const blog = await this.blogService.getBlogById(id);
            if (!blog) {
                throw new NotFoundException();
            }
            return blog;
        } catch (exception) {
            console.log(exception);
            throw exception;
        }
    }

    @Delete(':id')
    async deleteBlog(@Param('id') id: string) {
        try {
            const result = await this.blogService.deleteBlog(id);
            if (!result) {
                throw new NotFoundException();
            }
        } catch (exception) {
            console.log(exception);
            throw exception;
        }
    }

    @Put(':id')
    async updateBlog(
        @Param('id') id: string,
        @Body() updateBlogDto: UpdateBlogDto
    ): Promise<BlogModel> {
        try {
            const blog = await this.blogService.getBlogById(id);
            if (!blog) {
                throw new NotFoundException();
            }
            const response = await this.blogService.updateBlog(
                id,
                updateBlogDto.title,
                updateBlogDto.text,
            );
            return response;
        } catch (exception) {
            console.log(exception);
            throw exception;
        }
    }
}