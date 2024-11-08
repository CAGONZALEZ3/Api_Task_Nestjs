import { Injectable } from "@nestjs/common";
import { HeaderAPIKeyStrategy } from "passport-headerapikey";
import { AuthService } from "./auth.service";
import { PassportStrategy } from "@nestjs/passport";

@Injectable()
export class ApiKeyStrategy extends PassportStrategy(HeaderAPIKeyStrategy, 'headerapikey') {
    constructor(private authService: AuthService) {
        super({ header: 'apiKey', prefix: '' }, true, async (apikey, done) => {
            // Llama al servicio de autenticación para validar la API key
            const isValid = await this.authService.validateApiKey(apikey);
            
            if (!isValid) {
                return done(null, false); // null indica que no hubo error, pero false indica fallo de autenticación
            }
            return done(null, true); // Autenticación exitosa
        });
    }
}
