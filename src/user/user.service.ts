import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateUserDTO } from "./dto/create-user.dto";
import { PrismaService } from "src/prisma/prisma.service";
import { UpdatePatchUserDTO } from "./dto/update-patch-user.dto";
import { UpdatePutUserDTO } from "./dto/update-put-user.dto";
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {

    constructor(private readonly prisma: PrismaService) { }

    async createUser(newUser : CreateUserDTO) {

        newUser.password = await bcrypt.hash(newUser.password, await bcrypt.genSalt());

        return this.prisma.user.create({ 
            data: newUser
        });
    }

    async listUsers() {
        return this.prisma.user.findMany();
    }

    async getUser(id: number) {

        await this.verifyUser(id);

        return this.prisma.user.findUnique({
            where: {
                id
            }
        });
    }

    async updateUser(id: number, { name, email, password, birthAt, role}: UpdatePutUserDTO) {
        
        await this.verifyUser(id);

        password = await bcrypt.hash( password, await bcrypt.genSalt() );

        birthAt ? new Date(birthAt) : null;

        return this.prisma.user.update({
            where: {
                id
            },
            data: { name, email, password, birthAt, role}
        });
    }

    async updatePartialUser(id: number, { name, email, password, birthAt, role }: UpdatePatchUserDTO) {

        await this.verifyUser(id);

        const user: any = {}

        if(birthAt) user.birthAt = new Date(birthAt);
        if(name) user.name = name;
        if(email) user.email = email;
        if(password) user.password = await bcrypt.hash( password, await bcrypt.genSalt() );
        if(role) user.role = role;

        return this.prisma.user.update({
            where: {
                id
            },
            data: user
        });
    }
    
    async deleteUser(id: number) {

        await this.verifyUser(id);

        return this.prisma.user.delete({
            where: {
                id
            }
        });
    }

    async verifyUser(id: number) {
        if(!(await this.prisma.user.count({
            where: {
                id
            }
        }))){
            throw new NotFoundException(`O usuário com o id ${id} não existe.`)
        }
    }
}