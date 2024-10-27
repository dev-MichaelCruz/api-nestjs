import { Body, Controller, Delete, Get, Param, Patch, Post, Put } from "@nestjs/common";

@Controller('users')
export class UserController {

    @Post()
    async createUser(@Body() body) {
        return {body};
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
    async updateUser(@Body() body, @Param() params){
        return {
            method: 'put',
            body,
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