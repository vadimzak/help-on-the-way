# Help On The Way Server
This project contains the businsess logic & all database coummnications of the Help On The Way - Server.

## Runnig the project locally
TO run the project locally:
1. make sure you have docker & docker-compose installed on your machine, [how to install docker](https://docs.docker.com/compose/install/#install-compose)
2. Create a `.env` file at the `server` folder, containing the desired db name, schema, user & password, as well as the jwt secret. see [.example-env](.example-env) for refernce.
3. Run the following command `docker-compose up`  this command will run the server applicaton, db migrations and posgtres db server.
4. If you woud like to get into the server container:
 - run `docker ps` and find your CONTAINER_ID
 - run `docker exec -it CONTAINER_ID bash` will start a bash terminal inside the docker.
## High level description of the backend
### DB - Postgres DB
We are using Postgres 10 (which is currently the latest) as our db.
### DB migrations - Flyway
[Flyway by Boxfuse](https://github.com/flyway/) is a database migrations tool
This service will 
- Wait for the postgres db to be ready (via wait-for-postgres.sh script)
- Connect to the db
- Execute all /server/db/migrations/V[increasing number]__simple-description.sql files.
Please keep each sql statement in a different file
### Web - PostGraphQL
[PostGraphQL](https://github.com/postgraphql/postgraphql) creates an automatic GraphQL based api according to the database structure. 
In a nutshell, a Person table will automatically result with the following endpoints:
- **allPeople**: returns all persons.
- **personById**: which recieved a person's id and returns the person.
- **createPerson**: create a person.
- **deletePersonById**: deletes a person be id.
#### Example of usage:
In order to get familiar with the graphql api, run `docker-compose up` and go to the [Localhost GraphIQL Endpoint](http://localhost:5000/graphiql) or [Windows 7 GraphIQL Endpoint](http://192.168.99.100:5000/graphiql).
- Register a new volunteer user, and return the user's id, first and last name.
```graphql
mutation {
  registerPerson(input: {
    firstName: "John"
    lastName: "Doe"
    phoneNumber: "12345"
    username: "johnd"
    password: "passw0rd"
    city: "Tel aviv"
    street: "Moshe dayan"
    houseNumber: "1"
    enterance: "1"
  }) {
    person {
      id
      firstName
      lastName
      addressId
    }
  }
}

```
- Create a ticket
```graphql
mutation {
  createTicket(input: {
    ticket: {
      elderId: 1
      description: "desc"
      durationEta: "bla bla"
      issuingInstitue: "institue"
      dueDate: "1/1/2018"
      addressId: 1
      status: OPEN
      createdBy: 1
      maxVolunteers: 1
    }
  }) {
    ticket {
      id
    }
  }
}
```
- List all tickets, get only the id and elder's id properties: 
```graphql
{
  allTickets {
    nodes {
      id
      elderId
    }
  }
}
```
- Get a specific ticket
```graphql
{
  ticketById(id: 1) {
    id
    description
  }
}
```