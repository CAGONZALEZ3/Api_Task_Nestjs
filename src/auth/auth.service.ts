import { Injectable, UnauthorizedException } from '@nestjs/common';
import {ConfigService} from '@nestjs/config';
import { UserService } from 'src/modules/user/user.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from './constants/jwtConstants.secret';

@Injectable()
export class AuthService {

    private readonly apiKeyService;

    constructor(configService: ConfigService,
                private readonly userService : UserService,
                private readonly jwtService : JwtService
    ) {
        this.apiKeyService = configService.get('API_KEY');
    }

    async register(registerDto : RegisterDto){
        return this.userService.create(registerDto);
    }

    async login({email, password} : LoginDto){
        const user = await this.userService.validateUser(email, password)

        const payload = {email: user.email, sub: user.id}

        const token = await this.jwtService.signAsync(payload);
        return {token,user}
    }

    validateApiKey(apiKey: string):boolean {
        return this.apiKeyService === apiKey
    }

    async validatetoken(token: string): Promise<any>{
        try {
            const payload = await this.jwtService.verifyAsync(
              token,
              {
                secret: jwtConstants.secret
              }
            )

            return payload;
        } catch (error) {
        throw new UnauthorizedException();
        }
    }

    
}
