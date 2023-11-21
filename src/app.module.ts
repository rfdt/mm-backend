import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {ChannelModule} from './channel/channel.module';
import {MongooseModule} from "@nestjs/mongoose";
import {UserModule} from "./user/user.module";
import {AuthModule} from "./auth/auth.module";
import {FilesModule} from "./files/files.module";

@Module({
    imports: [
        MongooseModule.forRoot('mongodb://mongodbrootuser:somefuckingpassword@192.168.43.43:27017/', {dbName: 'ttm-variant-second'}),
        FilesModule,
        ChannelModule,
        UserModule,
        AuthModule
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
