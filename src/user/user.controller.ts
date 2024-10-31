import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Put, UseInterceptors } from "@nestjs/common";
import { CreateUserDTO } from "./dto/create-user.dto";
import { UpdatePutUserDTO } from "./dto/update-put-user.dto";
import { UpdatePatchUserDTO } from "./dto/update-patch-user.dto";
import { UserService } from "./user.service";
import { LogInterceptor } from "src/interceptors/log.interceptor";
import { ParamId } from "src/decorators/param-id.decorator";

@UseInterceptors(LogInterceptor)
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
    async getUser(@ParamId() id: number) {
        return this.userService.getUser(id);
    }

    @Put(':id')
    async updateUser(@Body() user : UpdatePutUserDTO, @ParamId() id: number){
        return this.userService.updateUser(id, user)
    }

    @Patch(':id')
    async updatePartialUser(@Body() user : UpdatePatchUserDTO, @ParamId() id: number){
        return  this.userService.updatePartialUser(id, user)
    }

    @Delete(':id') 
    async deleteUser(@ParamId() id: number) {
        return this.userService.deleteUser(id)
    }
}