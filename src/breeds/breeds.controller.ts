import { Controller, Get, Post, Body, Param, Put, Delete , ValidationPipe, UsePipes, UseGuards} from '@nestjs/common';
import { BreedsService } from "./breeds.service";
import { Breed } from "./breed.model";
import { ValidationHandler } from 'src/common/validation-handler';
import { ApiResponse, ErrorResponse } from 'src/common/response.dto';
import { BreedExistsValidator } from './validators/breed-exists-validator';
import { LocalAuthGuard } from '../auth/local-auth.guard';

@Controller('breeds')
@UseGuards(LocalAuthGuard) 
export class BreedsController {
    constructor(private readonly breedsService: BreedsService, private readonly validationHandler: ValidationHandler) { }

    @Get()
    async findAll(): Promise<ApiResponse<Breed[]> | ErrorResponse> {
        return new ApiResponse<Breed[]>(await this.breedsService.findAll(), 'Razas obtenidas exitosamente.', 200);
    }

    @Post()
    @UsePipes(new ValidationPipe())
    async create(@Body() breed: Breed): Promise<ApiResponse<Breed> | ErrorResponse> {
        this.validationHandler.clearValidators();
        this.validationHandler.addValidator(new BreedExistsValidator(this.breedsService));
        breed = await this.validationHandler.handle(breed);
        return new ApiResponse<Breed>(await this.breedsService.create(breed), 'Raza creada exitosamente.', 201);
    }

    @Get(':id')
    async findOne(@Param('id') id: number): Promise<ApiResponse<Breed> | ErrorResponse> {
        return new ApiResponse<Breed>(await this.breedsService.findOne(id), 'Raza obtenida exitosamente.', 200);
    }

    @Put(':id')
    async update(@Param('id') id: number, @Body() breed: Breed): Promise<ApiResponse<Breed> | ErrorResponse> {
        return new ApiResponse<Breed>(await this.breedsService.update(id, breed), 'Raza actualizada exitosamente.', 200);
    }

    @Delete(':id')
    async delete(@Param('id') id: number): Promise<ApiResponse<Breed> | ErrorResponse> {
        return new ApiResponse<Breed>(await this.breedsService.delete(id), 'Raza eliminada exitosamente.', 200);
    }
}
