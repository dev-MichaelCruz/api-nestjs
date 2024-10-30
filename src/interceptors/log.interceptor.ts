import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { Observable, tap } from "rxjs";

@Injectable()
export class LogInterceptor implements NestInterceptor { 

    intercept( context: ExecutionContext, next: CallHandler): Observable<any> {

        const dt = Date.now()

        return next.handle().pipe(tap( () => {
            const request = context.switchToHttp().getRequest();

            console.log(`Method: ${request.method}`)
            console.log(`URL: ${request.url}`)
            console.log(`Execução durou: ${(Date.now() - dt)} milissegundos`);
        }));
    }

}