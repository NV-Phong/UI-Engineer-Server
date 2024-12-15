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
import axios from 'axios';

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

      if (!registerDTO.username || !registerDTO.password) {
         throw new RpcException({
            message: !registerDTO.username
               ? 'Username is required'
               : 'Password is required',
            statusCode: HttpStatus.BAD_REQUEST,
         });
      } else {
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
   }

   GenerateAccessToken(user: User) {
      const payload = { username: user.username, sub: user._id };
      return this.jwtservice.sign(payload, {
         secret: process.env.ACCESS_TOKEN_SECRET,
         expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN,
      });
   }

   GenerateRefreshToken(user: User) {
      const payload = { username: user.username, sub: user._id };
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

   async RefreshAccessToken(
      refreshaccesstokenDTO: RefreshAccessTokenDTO,
   ): Promise<TokenResponse> {
      try {
         const user = await this.usermodel
            .findById(refreshaccesstokenDTO.IDUser)
            .exec();
         if (!user) {
            throw new RpcException(
               `User with ID ${refreshaccesstokenDTO.IDUser} not found`,
            );
         }
         return { access_token: this.GenerateAccessToken(user) };
      } catch (error) {
         throw new RpcException({
            message: 'Invalid token',
            statusCode: HttpStatus.BAD_REQUEST,
            error: error,
         });
      }
   }

   async GithubLoginOrCreate(githubToken: TokenResponse) {
      const { data: user } = await axios.get(process.env.GITHUB_API_USER, {
         headers: { Authorization: `Bearer ${githubToken.access_token}` },
      });

      let GithubUser = await this.usermodel.findOne({
         githubID: user.id,
      });

      if (!GithubUser) {
         GithubUser = new this.usermodel({
            GithubAccessToken: githubToken.access_token,
            githubID: user.id,
            username: user.login,
            displayname: user.name,
            email: user.email,
         });
         await GithubUser.save();
      }

      const AccessToken = this.GenerateAccessToken(GithubUser);
      const RefreshToken = this.GenerateRefreshToken(GithubUser);

      return {
         access_token: AccessToken,
         refresh_token: RefreshToken,
      };
   }
}
