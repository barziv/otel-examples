import { Injectable } from '@nestjs/common';
import * as amqplib from 'amqplib';
import { Span } from './tracing-utils';

@Injectable()
export class AppService {
  channel: amqplib.Channel;
  
  async createChannel() {
    if (this.channel) return;

    const connection = await amqplib.connect('amqp://guest:guest@localhost:5672/%2F');
    this.channel = await connection.createChannel();
  }

  @Span('this is test span', 'appService')
  async getHello(): Promise<string> {
    await this.createChannel();
    this.channel.sendToQueue('test', Buffer.from('strong'));
    return 'Hello World!';
  }
}
