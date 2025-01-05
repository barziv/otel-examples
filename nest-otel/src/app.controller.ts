import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { Span } from './tracing-utils';
import { ILogger } from './logger';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly logger: ILogger,
  ) { }

  @Get()
  @Span()
  async getHello(): Promise<string> {
    this.logger.info('im in the controller', {});
    return await this.appService.getHello("bar");
  }

  @Get('number')
  @Span()
  async getNumber(): Promise<string> {
    this.logger.info('im in the number controller', {});
    const response = await fetch('http://localhost:3000');
    const text = await response.text();
    return text;
  }
}
