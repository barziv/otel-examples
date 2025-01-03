import {
  ConsoleSpanExporter,
  SimpleSpanProcessor,
} from '@opentelemetry/sdk-trace-base';
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-proto';
import { NodeSDK } from '@opentelemetry/sdk-node';
import * as process from 'process';
import { HttpInstrumentation } from '@opentelemetry/instrumentation-http';
import { ExpressInstrumentation } from '@opentelemetry/instrumentation-express';
import { AmqplibInstrumentation } from '@opentelemetry/instrumentation-amqplib';


const traceExporter = new OTLPTraceExporter({
  url: 'http://localhost:4318/v1/traces'
});

export const opentelemetrySDK = new NodeSDK({
  serviceName: 'barvaz-app-service',
  spanProcessor: new SimpleSpanProcessor(traceExporter),
  instrumentations: [new HttpInstrumentation(), new ExpressInstrumentation(), new AmqplibInstrumentation()],
  // instrumentations: [],
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
