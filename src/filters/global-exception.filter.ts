import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus, BadRequestException } from '@nestjs/common';
import { Response } from 'express';
import { ValidationError } from 'sequelize';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
    catch(exception: ValidationError | HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();

        console.log("EXCEPTION GLOBAL", exception);

        let status = 500;
        let message = 'Error interno del servidor';


        if (exception instanceof HttpException) {
            status = exception.getStatus();
            message = exception.message;
        }

        if(exception instanceof BadRequestException){
            status = exception.getStatus();
            message = 'Errores de validación';
            const data_errors = exception.getResponse();
            const errors = data_errors['message'];
            response.status(status).json({
                message,
                errors,
            });
        }
        else if (exception instanceof ValidationError) {
            const errors = exception.errors.map((error) => ({
                campo: error.path,
                message: error.message,
            }));
            status = HttpStatus.BAD_REQUEST;
            message = 'Errores de validación';
            response.status(status).json({
                message,
                errors,
            });
        } else {
            response.status(status).json({
                message,
                status,
            });
        }
    }
}