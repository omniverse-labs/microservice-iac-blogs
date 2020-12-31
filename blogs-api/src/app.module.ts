import { Module } from '@nestjs/common';
import { ConfigModule } from './config/config.module';
import { BlogModule } from './resources/blog/blog.module';


@Module({
  imports: [ConfigModule, BlogModule],
})
export class AppModule { }
