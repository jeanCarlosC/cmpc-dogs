// src/common/response.dto.ts
import { HttpException, HttpStatus } from '@nestjs/common';

export class ApiResponse<T> {
  data: T;
  message: string;
  statusCode: number;

  constructor(data: T, message: string, statusCode: number) {
    this.data = data;
    this.message = message;
    this.statusCode = statusCode;
  }
}

export class ErrorResponse {
  statusCode: number;
  message: string;

  constructor(error: HttpException , message?: string, statusCode?: number) {
    this.statusCode = statusCode || error.getStatus() || HttpStatus.INTERNAL_SERVER_ERROR;
    this.message = message || error.message || 'Internal Server Error';
  }
}
