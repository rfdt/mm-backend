import { Module } from '@nestjs/common';
import {FilesController} from "./files.controller";
import {FilesService} from "./files.service";
import {MinioModule} from "nestjs-minio-client";

@Module({
  imports: [
    MinioModule.register({
      endPoint: '192.168.43.43',
      port: 9000,
      useSSL: false,
      accessKey: 'mm.fedko',
      secretKey: 'vfvjxrf2525'
    }),
  ],
  controllers: [
      FilesController
  ],
  providers: [FilesService],
  exports: [FilesService]
})

export class FilesModule {}
