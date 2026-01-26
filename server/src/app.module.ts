import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DbModule } from './db/db.module';
import { ProductModule } from './product/product.module';
import { CollectionModule } from './collection/collection.module';
import { WorkerModule } from './worker/worker.module';
import { ProjectModule } from './project/project.module';
import { ProjectPicModule } from './project-pic/project-pic.module';
import { MockAuthMiddleware } from './common/middleware/mock-auth.middleware';

@Module({
  imports: [
    DbModule,
    ProductModule,
    CollectionModule,
    WorkerModule,
    ProjectModule,
    ProjectPicModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(MockAuthMiddleware).forRoutes('*');
  }
}
