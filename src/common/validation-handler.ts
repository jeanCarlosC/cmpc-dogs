import { Injectable } from '@nestjs/common';

@Injectable()
export class ValidationHandler {
  private readonly validators: { validate: (data: any) => Promise<any> }[] = [];

  addValidator(validator: { validate: (data: any) => Promise<any> }): void {
    this.validators.push(validator);
  }
  clearValidators(): void {
    this.validators.splice(0, this.validators.length);
  }

  async handle(data: any): Promise<any> {
    for (const validator of this.validators) {
      data = await validator.validate(data);
    }
    return data;
  }
}