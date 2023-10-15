import { Controller, Get, Post, Body, Param, Put, Delete, HttpException, HttpStatus, ValidationPipe, UsePipes, UseGuards } from '@nestjs/common';
import { ApiResponse, ErrorResponse } from '../common/response.dto';
import { DogsService } from './dogs.service';
import { Dog } from './dog.model';
import { BreedExistsValidator } from './validators/breed-exists-validator';
import { SubBreedExistsValidator } from './validators/subbreed-exists-validator';
import { DogExistsValidator } from './validators/dog-exists-validator';
import { DogExistsUpdateValidator } from './validators/dog-exists-update-validator';
import { FindDogValidator } from './validators/find-dog-validator';
import { ValidationHandler } from '../common/validation-handler';
import { BreedsService } from 'src/breeds/breeds.service';
import { SubbreedsService } from 'src/subbreeds/subbreeds.service';
import { LocalAuthGuard } from '../auth/local-auth.guard';


@Controller('dogs')
@UseGuards(LocalAuthGuard) 
export class DogsController {
    constructor(private readonly dogsService: DogsService, private readonly breedService: BreedsService, private readonly subbreedService: SubbreedsService, private validationHandler: ValidationHandler) { }

    @Get()
    async findAll(): Promise<ApiResponse<Dog[]> | ErrorResponse> {
        try {
            const dogs: Dog[] = await this.dogsService.findAll();
            return new ApiResponse<Dog[]>(dogs, 'Mascotas obtenidas exitosamente.', 200);
        } catch (error) {
            return new ErrorResponse(error);
        }
    }

    @Get(':id')
    async findOne(@Param('id') id: number): Promise<ApiResponse<Dog> | ErrorResponse> {

        try {
            const dog: Dog = await this.dogsService.findOne(id);
            if (!dog) {
                return new ErrorResponse(new HttpException('La mascota con id ${id} no existe.', HttpStatus.NOT_FOUND));
            }
            return new ApiResponse<Dog>(dog, 'Mascota obtenida exitosamente', 200);
        }
        catch (error) {
            return new ErrorResponse(error);
        }
    }

    @Post()
    @UsePipes(new ValidationPipe())
    async create(@Body() body: Dog): Promise<ApiResponse<Dog> | ErrorResponse> {
        this.validationHandler.clearValidators();
        this.validationHandler.addValidator(new DogExistsValidator(this.dogsService));
        this.validationHandler.addValidator(new BreedExistsValidator(this.breedService));
        this.validationHandler.addValidator(new SubBreedExistsValidator(this.subbreedService));
        await this.validationHandler.handle(body);

        const dog: Dog = await this.dogsService.create(body);
        return new ApiResponse<Dog>(dog, 'Mascota creada exitosamente.', 201);
    }

    @Put(':id')
    async update(@Param('id') id: number, @Body() body: any): Promise<ApiResponse<Dog> | ErrorResponse> {
        try {
            this.validationHandler.clearValidators();
            this.validationHandler.addValidator(new FindDogValidator(this.dogsService));
            this.validationHandler.addValidator(new DogExistsUpdateValidator(this.dogsService));
            body = await this.validationHandler.handle({ id, ...body });

            const dog: Dog = await this.dogsService.update(id, body);
            return new ApiResponse<Dog>(dog, 'Mascota actualizada exitosamente.', 200);

        }
        catch (error) {
            return new ErrorResponse(error);
        }
    }

    @Delete(':id')
    async remove(@Param('id') id: number): Promise<ApiResponse<Dog> | ErrorResponse> {
        try {
            this.validationHandler.clearValidators();
            this.validationHandler.addValidator(new FindDogValidator(this.dogsService));
            await this.validationHandler.handle({ id });

            const dog: Dog = await this.dogsService.remove(id);
            return new ApiResponse<Dog>(dog, 'Mascota eliminada exitosamente.', 200);

        }
        catch (error) {
            return new ErrorResponse(error);
        }
    }
}