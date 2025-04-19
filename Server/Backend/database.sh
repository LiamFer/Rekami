podman create --name rekami-db \
-e POSTGRES_USER=postgres \
-e POSTGRES_PASSWORD=postgres \
-e POSTGRES_DB=rekami \
-p 5432:5432 \
-v ./postgres:/data/db \
docker.io/library/postgres
#########
podman start postgres

# Redis Database
podman network create redis-net

podman run -d \
  --name redis \
  --network redis-net \
  -p 6379:6379 \
  -v redis-data:/data \
  redis:latest \
  redis-server --save 60 1 --loglevel warning

podman run -d \
  --name redis-commander \
  --network redis-net \
  -p 8081:8081 \
  -e REDIS_HOSTS=local:redis:6379 \
  rediscommander/redis-commander:latest

# Redis Commander vai poder ser acessado em http://localhost:8081