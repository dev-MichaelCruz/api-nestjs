import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { UserModule } from "src/user/user.module";
import { PrismaModule } from "src/prisma/prisma.module";

@Module({
    imports: [ 
        JwtModule.register({
            secret: "pRccrrAgt9bSjd6nj6Y:BCpehFbpadp$m!h0f3RxsS&u>5DH9[dk7a?(nb0e(?Nv5",
        }),
        UserModule,
        PrismaModule    
    ],
    controllers: [ AuthController ],
    providers: [ AuthService ],
})
export class AuthModule {

    
}
