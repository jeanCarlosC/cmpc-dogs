// src/common/response.dto.ts
import { HttpException, HttpStatus } from '@nestjs/common';

export class ApiResponse<T> {
  data: T;
  message: string;
  status: number;

  constructor(data: T, message: string, status: number) {
    this.data = data;
    this.message = message;
    this.status = status;
  }
}

export class ErrorResponse {
  status: number;
  message: string;

  constructor(error: HttpException , message?: string, status?: number) {
    this.status = status || error.getStatus() || HttpStatus.INTERNAL_SERVER_ERROR;
    this.message = message || error.message || 'Internal Server Error 2';
  }
}
