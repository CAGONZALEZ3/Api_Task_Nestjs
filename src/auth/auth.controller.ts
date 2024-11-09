import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto, LoginResponseDto } from './dto/login.dto';
import { AuthGuard } from './guard/auth.guard';
import { ApiBody, ApiHeader, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
@ApiHeader({
  name: 'x-api-key',
  description: 'API Key to access the protected route',
  required: true,
})
export class AuthController {

    constructor(
        private readonly authService : AuthService
    ){}

    @ApiOperation({summary: 'Create a new user'})
    @ApiBody({
        description: 'Data required to register a user',
        type: RegisterDto,
        examples: {
          register: {
            summary: 'Example of data for user registration',
            value: {
              email: 'example@example.com',
              password: '123456789',
              name: 'User name'
            }
          }
        }
      })
    @ApiResponse({ status: 201, description: 'User created successfully',type: RegisterDto })
    @ApiResponse({
        status: 401,
        description: 'Invalid credentials',
        content: {
          'application/json': {
            example: {
              message: 'Invalid Credentials',
              error: 'Unauthorized',
              statusCode: 401,
            },
          },
        },
      })
      @ApiResponse({ status: 400, description: 'Bad Request' })
    @Post('register')
    register(@Body() registerDto : RegisterDto){
        return this.authService.register(registerDto);
    }

    @ApiOperation({summary: 'Login'})
    @ApiBody({
        description: 'Data required to log in',
        type: LoginDto,
        examples: {
          login: {
            summary: 'Example of login data',
            value: {
              email: 'example@example.com',
              password: '123456789'
            }
          }
        }
      })
    @ApiResponse({ status: 201, description: 'Login successful', type: LoginResponseDto })
    @ApiResponse({ status: 400, description: 'Bad request' })
    @Post('login')
    login(@Body() logindto : LoginDto){
        return this.authService.login(logindto);
    }

    @Get('profile')
    @UseGuards(AuthGuard)
    @ApiHeader({
      name: 'Authorization',
      description: 'Bearer JWT token',
      required: true, // Especifica que este header es necesario para acceder a la ruta protegida
    })
    profile(){
        return 'profile';
    }
}
