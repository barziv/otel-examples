### Commands
**Otlp collector** \
```bash
docker run -p 4317:4317 -p 4318:4318 --rm -v $(pwd)/otel-config.yaml:/etc/otelcol/config.yaml otel/opentelemetry-collector

docker run -p 4317:4317 -p 4318:4318 --rm -v $(pwd)/otel-config.yaml:/etc/otelcol/config.yaml otel/opentelemetry-collector-contrib:0.60.0
```

**jaeger**
```bash
docker run -d --name jaeger --rm \
  -p 5775:5775/udp \
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

**APM elastic**
```bash
docker run --rm -v $(pwd)/apm-config.yaml:/etc/otelcol/config.yaml docker.elastic.co/apm/apm-server:7.15.2

docker run -d --rm \
  -p 8200:8200 \
  --name=apm-server \
  --user=apm-server \
  -v "$(pwd)/apm-config.yaml:/usr/share/apm-server/apm-server.yml:ro" \
  docker.elastic.co/apm/apm-server:7.15.2

  --strict.perms=false -e \
  -E output.elasticsearch.hosts=["192.168.1.15:9200"]
```