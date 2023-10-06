import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { ApiResponse, ErrorResponse } from '../common/response.dto';
import { DogsService } from './dogs.service';
import { Dog } from './dog.model';
import { HttpException, HttpStatus } from '@nestjs/common';

@Controller('dogs')
export class DogsController {
    constructor(private readonly dogsService: DogsService) { }

    @Get()
    async findAll(): Promise<ApiResponse<Dog[]> | ErrorResponse> {
        try {
            const dogs: Dog[] = await this.dogsService.findAll();

            return new ApiResponse<Dog[]>(dogs, 'Dogs retrieved successfully.', 200);

        } catch (error) {
            return new ErrorResponse(error);
        }
    }

    @Get(':id')
    async findOne(@Param('id') id: number): Promise<ApiResponse<Dog> | ErrorResponse> {

        try {
            const dog: Dog = await this.dogsService.findOne(id);
            if (!dog) {
                return new ErrorResponse(new HttpException('Dog not found.', HttpStatus.NOT_FOUND));
            }

            return new ApiResponse<Dog>(dog, 'Dog retrieved successfully.', 200);

        }
        catch (error) {
            return new ErrorResponse(error);
        }
    }

    @Post()
    async create(@Body() body: any): Promise<ApiResponse<Dog> | ErrorResponse> {
        try {
            const existingDog: Dog = await this.dogsService.findOneByName(body.name);
            if (existingDog) {
                return new ErrorResponse(new HttpException('Dog already exists.', HttpStatus.CONFLICT));
            }
            const dog: Dog = await this.dogsService.create(body);

            return new ApiResponse<Dog>(dog, 'Dog created successfully.', 201);

        }
        catch (error) {
            return new ErrorResponse(error);
        }
    }

    @Put(':id')
    async update(@Param('id') id: number, @Body() body: any): Promise<ApiResponse<Dog> | ErrorResponse> {
        try {
            const dog: Dog = await this.dogsService.update(id, body);
            if (!dog) {
                return new ErrorResponse(new HttpException('Dog not found.', HttpStatus.NOT_FOUND));
            }
            return new ApiResponse<Dog>(dog, 'Dog updated successfully.', 200);

        }
        catch (error) {
            return new ErrorResponse(error);
        }
    }

    @Delete(':id')
    async remove(@Param('id') id: number): Promise<ApiResponse<Dog> | ErrorResponse> {
        try {
            const dog: Dog = await this.dogsService.remove(id);
            if (!dog) {
                return new ErrorResponse(new HttpException('Dog not found.', HttpStatus.NOT_FOUND));
            }
            return new ApiResponse<Dog>(dog, 'Dog deleted successfully.', 200);

        }
        catch (error) {
            return new ErrorResponse(error);
        }
    }
}