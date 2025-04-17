podman create --name rekami-db \
-e POSTGRES_USER=postgres \
-e POSTGRES_PASSWORD=postgres \
-e POSTGRES_DB=rekami \
-p 5432:5432 \
-v ./postgres:/data/db \
docker.io/library/postgres
#########
podman start postgres

