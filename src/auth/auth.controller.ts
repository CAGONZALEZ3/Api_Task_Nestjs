import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto, LoginResponseDto } from './dto/login.dto';
import { AuthGuard } from './guard/auth.guard';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {

    constructor(
        private readonly authService : AuthService
    ){}

    @ApiOperation({summary: 'Crear un nuevo usuario'})
    @ApiBody({
        description: 'Datos necesarios para registrar un usuario',
        type: RegisterDto,
        examples: {
          register: {
            summary: 'Ejemplo de datos para el registro de un usuario',
            value: {
              email: 'usuario@example.com',
              password: 'ContraseñaSegura123',
              name: 'Nombre Usuario'
            }
          }
        }
      })
    @ApiResponse({ status: 201, description: 'Usuario creado con exito',type: RegisterDto })
    @ApiResponse({
        status: 401,
        description: 'Credenciales inválidas',
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
      @ApiResponse({ status: 400, description: 'Solicitud Incorrecta' })
    @Post('register')
    register(@Body() registerDto : RegisterDto){
        return this.authService.register(registerDto);
    }

    @ApiOperation({summary: 'Inicias sesion'})
    @ApiBody({
        description: 'Datos necesarios para iniciar sesión',
        type: LoginDto,
        examples: {
          login: {
            summary: 'Ejemplo de datos para iniciar sesión',
            value: {
              email: 'camiloc.j04@gmail.com',
              password: '123456789'
            }
          }
        }
      })
    @ApiResponse({ status: 201, description: 'Login correcto', type: LoginResponseDto })
    @ApiResponse({ status: 400, description: 'Solicitud Incorrecta' })
    @Post('login')
    login(@Body() logindto : LoginDto){
        return this.authService.login(logindto);
    }

    @Get('profile')
    @UseGuards(AuthGuard)
    profile(){
        return 'profile';
    }
}
