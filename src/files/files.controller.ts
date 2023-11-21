import {Controller, Post, UploadedFiles, UseInterceptors} from "@nestjs/common";
import {FilesService} from "./files.service";
import {FileFieldsInterceptor} from "@nestjs/platform-express";

@Controller('files')
export class FilesController {
  constructor(private readonly FilesService: FilesService) {

  }

  @UseInterceptors(FileFieldsInterceptor([
    {name: "files"}
  ]))
  @Post('/upload')
  async uploadFile(@UploadedFiles() files){
      return await this.FilesService.uploadFiles(files.files, 'file');
  }

}
