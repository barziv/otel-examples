### Opensearch
```bash
docker run --rm -p 9200:9200 -e cluster.name=test -e DISABLE_SECURITY_PLUGIN=true -e discovery.type=single-node opensearchproject/opensearch:latest

docker run --rm -p 5601:5601 -e OPENSEARCH_HOSTS=http://192.168.1.25:9200 -e DISABLE_SECURITY_DASHBOARDS_PLUGIN=true opensearchproject/opensearch-dashboards:latest
```