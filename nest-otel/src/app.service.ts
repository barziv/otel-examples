import * as amqplib from 'amqplib';
import { Injectable } from '@nestjs/common';

import { ILogger } from './logger';
import { Span } from './tracing-utils';

@Injectable()
export class AppService {
  channel: amqplib.Channel;

  constructor(private readonly _logger: ILogger) { }

  async createChannel() {
    if (this.channel) return;

    const connection = await amqplib.connect('amqp://guest:guest@localhost:5672/%2F');
    this.channel = await connection.createChannel();
  }

  @Span()
  async getHello(name: string): Promise<string> {
    // await this.createChannel();
    // this.channel.sendToQueue('test', Buffer.from('strong'));
    this._logger.info('got request', {});
    return `Hello ${name}!`;
  }
}
