### Commands
**Otlp collector** \
```bash
docker run -p 4317:4317 -p 4318:4318 --rm -v $(pwd)/config.yaml:/etc/otelcol/config.yaml otel/opentelemetry-collector
```

**jaeger**
```bash
docker run -d --name jaeger --rm \  -p 5775:5775/udp \
  -p 6831:6831/udp \
  -p 6832:6832/udp \
  -p 5778:5778 \
  -p 16686:16686 \
  -p 14250:14250 \
  -p 14268:14268 \
  -p 14269:14269 \
  -p 4319:4317 \
  -p 4320:4318 \
  -p 9411:9411 \
  jaegertracing/all-in-one:1.52
```