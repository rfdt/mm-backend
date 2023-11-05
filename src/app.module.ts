import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {ChannelModule} from './channel/channel.module';
import {MongooseModule} from "@nestjs/mongoose";
import {UserModule} from "./user/user.module";
import {AuthModule} from "./auth/auth.module";
import * as process from "process";

@Module({
    imports: [
        MongooseModule.forRoot(process.env.MONGO_URI, {dbName: process.env.MONGO_DB}),
        ChannelModule,
        UserModule,
        AuthModule
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
