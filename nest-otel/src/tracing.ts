import {
    ConsoleSpanExporter,
    SimpleSpanProcessor,
  } from '@opentelemetry/sdk-trace-base';
  import { NodeSDK } from '@opentelemetry/sdk-node';
  import * as process from 'process';
  import { HttpInstrumentation } from '@opentelemetry/instrumentation-http';
  import { ExpressInstrumentation } from '@opentelemetry/instrumentation-express';
  import { AmqplibInstrumentation } from '@opentelemetry/instrumentation-amqplib';

  
  const traceExporter = new ConsoleSpanExporter();
  
  export const opentelemetrySDK = new NodeSDK({
    spanProcessor: new SimpleSpanProcessor(traceExporter),
    instrumentations: [new HttpInstrumentation(), new ExpressInstrumentation(), new AmqplibInstrumentation()],
    // instrumentations: [new HttpInstrumentation()],
  });
  
  // gracefully shut down the SDK on process exit
  process.on('SIGTERM', () => {
    opentelemetrySDK
      .shutdown()
      .then(
        () => console.log('SDK shut down successfully'),
        (err) => console.log('Error shutting down SDK', err),
      )
      .finally(() => process.exit(0));
  });
  