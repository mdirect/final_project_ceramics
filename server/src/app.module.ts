import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DbModule } from './db/db.module';
import { ProductModule } from './product/product.module';
import { CollectionModule } from './collection/collection.module';

@Module({
  imports: [DbModule, ProductModule, CollectionModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
