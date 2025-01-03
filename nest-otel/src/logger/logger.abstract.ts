import { Injectable } from "@nestjs/common";
import { LogInput } from "./logger.dto";

@Injectable()
export abstract class ILogger {
    abstract debug(message: string, log: Partial<LogInput>): Promise<void> | void;
    abstract info(message: string, log: Partial<LogInput>): Promise<void> | void;
    abstract warn(message: string, log: Partial<LogInput>): Promise<void> | void;
    abstract error(message: string, log: Partial<LogInput>): Promise<void> | void;
}