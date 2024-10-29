import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Put } from "@nestjs/common";
import { CreateUserDTO } from "./dto/create-user.dto";
import { UpdatePutUserDTO } from "./dto/update-put-user.dto";
import { UpdatePatchUserDTO } from "./dto/update-patch-user.dto";
import { UserService } from "./user.service";

@Controller('users')
export class UserController {

    constructor(private readonly userService: UserService) {}

    @Post()
    async createUser(@Body() newUser: CreateUserDTO) {
        return this.userService.createUser(newUser) ;
    }

    @Get()
    async listUsers() {
        return this.userService.listUsers();
    }

    @Get(':id')
    async getUser(@Param('id', ParseIntPipe) id: number) {
        return this.userService.getUser(id);
    }

    @Put(':id')
    async updateUser(@Body() user : UpdatePutUserDTO, @Param('id', ParseIntPipe) id: number){
        return this.userService.updateUser(id, user)
    }

    @Patch(':id')
    async updatePartialUser(@Body() user : UpdatePatchUserDTO, @Param('id', ParseIntPipe) id: number){
        return  this.userService.updatePartialUser(id, user)
    }

    @Delete(':id') 
    async deleteUser(@Param('id', ParseIntPipe) id: number) {
        return this.userService.deleteUser(id)
    }
}