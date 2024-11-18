import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { User, UserDocument } from '../schema/user.schema';
import { RegisterDTO } from './dto/register.dto';
import { RpcException } from '@nestjs/microservices';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { LoginDTO } from './dto/login.dto';

@Injectable()
export class AuthService {
   constructor(
      @InjectModel(User.name) private usermodel: Model<UserDocument>,
      private readonly jwtservice: JwtService,
      private readonly userservice: UserService,
   ) {}

   async Register(registerDTO: RegisterDTO): Promise<any> {
      const user = await this.usermodel.findOne({
         $or: [
            { username: registerDTO.username },
            { email: registerDTO.email },
         ],
      });

      if (user) {
         const errorMessage =
            user.username === registerDTO.username
               ? 'User with this UserName already exists'
               : 'User with this Email already exists';
         throw new RpcException({
            message: errorMessage,
            statusCode: HttpStatus.CONFLICT,
         });
      }

      const HashedPassword = await bcrypt.hash(registerDTO.password, 10);
      await new this.usermodel({
         ...registerDTO,
         password: HashedPassword,
      }).save();

      return {
         message: 'User registered successfully',
         user: { username: registerDTO.username, email: registerDTO.email },
      };
   }

   GenerateAccessToken(user: User) {
      const payload = { username: user.username };
      return this.jwtservice.sign(payload, {
         secret: process.env.ACCESS_TOKEN_SECRET,
         expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN,
      });
   }

   GenerateRefreshToken(user: User) {
      const payload = { username: user.username };
      return this.jwtservice.sign(payload, {
         secret: process.env.REFRESH_TOKEN_SECRET,
         expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN,
      });
   }

   async Login(login: LoginDTO): Promise<LoginResponse> {
      const user = await this.usermodel.findOne({ username: login.username });
      if (user && (await bcrypt.compare(login.password, user.password))) {
         const AccessToken = this.GenerateAccessToken(user);
         const RefreshToken = this.GenerateRefreshToken(user);

         return {
            access_token: AccessToken,
            refresh_token: RefreshToken,
         };
      }
      throw new RpcException({
         message: 'Invalid credentials please try again',
         statusCode: HttpStatus.BAD_REQUEST,
      });
   }

   async RefreshAccessToken(refresh_token: string): Promise<TokenResponse> {
      try {
         const payload = this.jwtservice.verify(refresh_token, {
            secret: process.env.REFRESH_TOKEN_SECRET,
         });
         const user = await this.userservice.FindByUserName(payload.username);
         return { access_token: this.GenerateAccessToken(user) };
      } catch (error) {
         throw new RpcException({
            message: 'Invalid token',
            statusCode: HttpStatus.BAD_REQUEST,
            error: error,
         });
      }
   }
}
