import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from './auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly authService: AuthService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: 'cmpc_test',
        });
    }

    async validate(payload: any) {
        // Lógica para validar el token JWT y extraer el usuario
        const user = await this.authService.validateUserById(payload.sub);
        if (!user) {
            throw new UnauthorizedException('Token inválido');
        }
        return user;
    }
}
