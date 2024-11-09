import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { HeaderAPIKeyStrategy } from 'passport-headerapikey';
import { AuthService } from '../auth.service';

@Injectable()
export class ApiKeyStrategy extends PassportStrategy(HeaderAPIKeyStrategy, 'api-key') {
  constructor(private readonly authService: AuthService) {
    super(
      { header: 'x-api-key', prefix: '' }, // Se espera un encabezado `apiKey` sin prefijo.
      true, // Indica que la clave es obligatoria.
      async (apikey, done) => {
        const isValid = await this.authService.validateApiKey(apikey);
        if (!isValid) {
          return done(new UnauthorizedException(), false); // Lanza una excepción si no es válida.
        }
        return done(null, true); // Continúa si la API key es válida.
      }
    );
  }
}
