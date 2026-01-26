import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';

import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DbModule } from './db/db.module';
import { ProductModule } from './product/product.module';
import { CollectionModule } from './collection/collection.module';
import { WorkerModule } from './worker/worker.module';
import { ProjectModule } from './project/project.module';
import { ProjectPicModule } from './project-pic/project-pic.module';
import { MockAuthMiddleware } from './common/middleware/mock-auth.middleware';
import { AuthModule } from './auth/auth.module';
import { ProfileModule } from './profile/profile.module';
import { EventModule } from './event/event.module';
import { CatalogModule } from './catalog/catalog.module';
import { PostModule } from './post/post.module';
import { CartModule } from './cart/cart.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DbModule,
    ProductModule,
    CollectionModule,
    AuthModule,
    ProfileModule,
    EventModule,
    CatalogModule,
    PostModule,
    CartModule,
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
