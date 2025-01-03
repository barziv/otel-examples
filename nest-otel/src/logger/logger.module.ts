import { Module } from '@nestjs/common';
import { ILogger } from './logger.abstract';
import { ConsoleLogger } from './console-logger.service';

@Module({
    providers: [
        {
            provide: ILogger,
            useClass: ConsoleLogger
        }
    ],
    exports: [ILogger]
})
export class LoggerModule { }
