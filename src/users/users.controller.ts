import { Controller, Post, Body } from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthService } from '../auth/auth.service';
import { User } from './user.model';
import { ApiResponse, ErrorResponse } from '../common/response.dto';


@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @Post()
    async create(@Body() body: any): Promise<ApiResponse<User> | ErrorResponse> {
        try {
            const user: User = await this.usersService.create(body);
            return new ApiResponse<User>(user, 'User created successfully.', 201);
        } catch (error) {
            return new ErrorResponse(error);
        }
    }
}
