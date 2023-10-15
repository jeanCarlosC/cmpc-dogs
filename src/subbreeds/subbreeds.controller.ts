import { Controller, Get, Post, Body, Param, HttpException, HttpStatus, ValidationPipe, UsePipes, UseGuards } from '@nestjs/common';
import { SubbreedsService } from './subbreeds.service';
import { Subbreed } from './subbreed.model';
import { ApiResponse, ErrorResponse } from '../common/response.dto';
import { ValidationHandler } from '../common/validation-handler';
import { SubBreedExistsValidator } from './validators/subbreed-exists-validator';
import { BreedExistsValidator } from 'src/breeds/validators/breed-exist-validator';
import { BreedsService } from 'src/breeds/breeds.service';
import { LocalAuthGuard } from '../auth/local-auth.guard';

@Controller('subbreeds')
@UseGuards(LocalAuthGuard) 
export class SubbreedsController {
    constructor(private readonly subbreedsService: SubbreedsService, private readonly breedsService: BreedsService,  private readonly validationHandler: ValidationHandler){}

    @Get()
    async findAll(): Promise<ApiResponse<Subbreed[]> | ErrorResponse> {
        try {
            const subbreeds: Subbreed[] = await this.subbreedsService.findAll();
            return new ApiResponse<Subbreed[]>(subbreeds, 'Subrazas obtenidas exitosamente.', 200);
        } catch (error) {
            return new ErrorResponse(error);
        }
    }

    @Get(':id')
    async findOne(@Param('id') id: number): Promise<ApiResponse<Subbreed> | ErrorResponse> {

        try {
            const subbreed: Subbreed = await this.subbreedsService.findOne(id);
            if (!subbreed) {
                return new ErrorResponse(new HttpException('La subraza con id ${id} no existe.', HttpStatus.NOT_FOUND));
            }
            return new ApiResponse<Subbreed>(subbreed, 'Subraza obtenida exitosamente', 200);
        }
        catch (error) {
            return new ErrorResponse(error);
        }
    }

    @Post()
    @UsePipes(new ValidationPipe())
    async create(@Body() body: Subbreed): Promise<ApiResponse<Subbreed> | ErrorResponse> {
        this.validationHandler.clearValidators();
        this.validationHandler.addValidator(new SubBreedExistsValidator(this.subbreedsService));
        this.validationHandler.addValidator(new BreedExistsValidator(this.breedsService));
        await this.validationHandler.handle(body);

        const subbreed: Subbreed = await this.subbreedsService.create(body);
        return new ApiResponse<Subbreed>(subbreed, 'Subraza creada exitosamente.', 201);
    }


}
