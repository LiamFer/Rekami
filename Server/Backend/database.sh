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

# MongoDB Database
podman network create mongo-network
podman run -d --name rekami-mongo --network mongo-network -e MONGO_INITDB_ROOT_USERNAME=admin -e MONGO_INITDB_ROOT_PASSWORD=pass -p 27017:27017 mongo
podman run -d --name mongo-express \
  --network mongo-network \
  -e ME_CONFIG_MONGODB_SERVER=rekami-mongo \
  -e ME_CONFIG_MONGODB_ADMINUSERNAME=admin \
  -e ME_CONFIG_MONGODB_ADMINPASSWORD=pass \
  -e ME_CONFIG_MONGODB_URL="mongodb://admin:pass@rekami-mongo:27017/" \
  -p 8082:8081 \
  mongo-express
# Mongo Express vai poder ser acessado em http://localhost:8082