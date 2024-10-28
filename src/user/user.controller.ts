import { Body, Controller, Delete, Get, Param, Patch, Post, Put } from "@nestjs/common";
import { CreateUserDTO } from "./dto/create-user.dto";
import { UpdatePutUserDTO } from "./dto/update-put-user.dto";

@Controller('users')
export class UserController {

    @Post()
    async createUser(@Body() { name, email, password }: CreateUserDTO) {
        return { name, email, password };
    }

    @Get()
    async listUsers() {
        return {users: []};
    }

    @Get(':id')
    async getUser(@Param() params) {
        return {user: {}, params };
    }

    @Put(':id')
    async updateUser(@Body() { name, email, password } : UpdatePutUserDTO, @Param() params){
        return {
            method: 'put',
            name, email, password,
            params
        }
    }

    @Patch(':id')
    async updatePartialUser(@Body() body, @Param() params){
        return {
            method: 'patch',
            body,
            params
        }
    }

    @Delete(':id') 
    async deleteUser(@Param() params) {
        return {
            method: 'delete',
            params
        }
    }
}