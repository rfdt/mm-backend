import {HttpException, HttpStatus, Injectable} from "@nestjs/common";
import {MinioService} from "nestjs-minio-client";

@Injectable()
export class FilesService {

    constructor(private readonly minioService: MinioService) {
    }

    async uploadFiles(files, prefix) {
        try {
            let urls = [];
            for (let file of files) {
                const splittedFile = file.originalname.split('.')
                const fileExt = splittedFile[splittedFile.length - 1];
                const fileName = `${prefix}-${file.originalname.substring(0, file.originalname.lastIndexOf('.')) || file.originalname}-${new Date().toLocaleDateString()}-${new Date().toLocaleTimeString()}.${fileExt}`;
                await this.minioService.client.putObject('mm-files', fileName, file['buffer']);
                urls.push(`http://192.168.43.43:9000/mm-files/${fileName}`);
            }
            return urls;
        } catch (e) {
            throw new HttpException(e.message, HttpStatus.BAD_REQUEST)
        }
    }

}
