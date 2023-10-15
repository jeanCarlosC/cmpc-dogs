// local-auth.guard.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ExecutionContext } from '@nestjs/common';

@Injectable()
export class LocalAuthGuard extends AuthGuard(['local', 'jwt']) {
    // Este guardia se basa en una estrategia Passport llamada 'local'
    canActivate(context: ExecutionContext) {
        return super.canActivate(context);
    }

    handleRequest(err, user, info) {
        // Personaliza cómo manejar las respuestas de autenticación aquí
        if (err || !user) {
            throw new UnauthorizedException(); // Manejo de errores de autenticación
        }
        return user;
    }
}
