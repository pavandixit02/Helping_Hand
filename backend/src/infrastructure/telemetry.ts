import { NodeSDK } from '@opentelemetry/sdk-node';
import { getNodeAutoInstrumentations } from '@opentelemetry/auto-instrumentations-node';
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http';
import { Resource } from '@opentelemetry/resources';
import { SemanticResourceAttributes } from '@opentelemetry/semantic-conventions';

const traceExporter = new OTLPTraceExporter({
  url: process.env.OTLP_ENDPOINT || 'http://localhost:4318/v1/traces',
});

export const sdk = new NodeSDK({
  resource: new Resource({
    [SemanticResourceAttributes.SERVICE_NAME]: 'helpinghand-backend',
    [SemanticResourceAttributes.SERVICE_VERSION]: '1.0.0',
  }),
  traceExporter,
  instrumentations: [getNodeAutoInstrumentations()]
});

// Initialize the SDK and start tracing
export function initTelemetry() {
  try {
    sdk.start();
    console.log('[Telemetry] OpenTelemetry initialized successfully');
  } catch (error) {
    console.error('[Telemetry] Error initializing OpenTelemetry', error);
  }
}

// Gracefully shut down the SDK on process exit
process.on('SIGTERM', () => {
  sdk.shutdown()
    .then(() => console.log('[Telemetry] Tracing terminated'))
    .catch((error) => console.log('[Telemetry] Error terminating tracing', error))
    .finally(() => process.exit(0));
});
