import { trace, context } from '@opentelemetry/api';
import { ILogger } from "./logger.abstract";
import { LogInput } from "./logger.dto";
import { Injectable } from '@nestjs/common';

@Injectable()
export class ConsoleLogger implements ILogger {
    debug(message: string, log: Partial<LogInput>): void {
        log.level = 'debug';
        this._log(message, log);
    }
    info(message: string, log: Partial<LogInput>): void {
        log.level = 'info';
        this._log(message, log);
    }
    warn(message: string, log: Partial<LogInput>): void {
        log.level = 'warn';
        this._log(message, log);
    }
    error(message: string, log: Partial<LogInput>): void {
        log.level = 'error';
        this._log(message, log);
    }

    private _log(message: string, log: Partial<LogInput>) {
        const currentSpan = trace.getSpan(context.active());
        log.trace = {
            spanId: currentSpan.spanContext().spanId,
            traceId: currentSpan.spanContext().traceId,
        }
        log.message = message;

        console.log(JSON.stringify(log));
    }
}
