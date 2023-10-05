import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User, UserDocument } from "./user.schema";
import { createUserDTO } from "./dto/createUser.dto";

@Injectable()
export class UserService {

  constructor(@InjectModel(User.name) private UserModel: Model<UserDocument>) {
  }

  async createUser(createUserDTO: createUserDTO) {
    try {
      const newUser = new this.UserModel({ ...createUserDTO, roles: [createUserDTO.role] });
      return await newUser.save();
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }

  async getUserByLogin(login: string) {
    try {
      const user = await this.UserModel.findOne({login})
      return user;
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }

  async getUserById(id: string){
    try {
      const user = await this.UserModel.findById(id);
      return user;
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }

}