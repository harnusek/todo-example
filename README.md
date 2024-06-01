## Installation

```bash
$ pnpm install
```

## Running the app

```bash
# development
$ pnpm run start

# watch mode
$ pnpm run start:dev

```

## Swagger API documentation

- [http://localhost:3000/api](http://localhost:3000/api)

## Database setup

```bash
# start the database:
docker compose up -d

# build the app:
pnpm build

# run migrations:
typeorm migration:run -d ./dist/datasources/ormconfig.js
```

## Used technologies

- [NestJS](https://nestjs.com/)
- [TypeORM](https://typeorm.io/)
- [Swagger](https://swagger.io/)
- [PostgreSQL](https://www.postgresql.org/)
- [JWT](https://jwt.io/)

## Contact

- [ondrej.harnusek@gmail.com](mailto:ondrej.harnusek@gmail.com)
