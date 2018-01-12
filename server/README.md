# Help On The Way Server
This project contains the businsess logic & all database coummnications of the Help On The Way - Server.

## Runnig the project locally
TO run the project locally:
1. make sure you have docker & docker-compose installed on your machine, [how to install docker](https://docs.docker.com/compose/install/#install-compose)
2. Create a `.env` file at the `server` folder, containing the desiired db name, user & password, see [.example-env](.example-env) for refernce.
3. Run the following command `docker-compose up`  this command will run the server applicaton & posgtres db server.
4. If you woud like to get into the server container:
 - run `docker ps` and find your CONTAINER_ID
 - run `docker exec -it CONTAINER_ID bash` will start a bash terminal inside the docker.
## ORM library
We are using [TypeORM](https://github.com/typeorm/typeorm) as our ORM library, and as our way to manage the DB schemas & DB connection, make sure your read its documenation.
