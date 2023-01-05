## About the Project

This is a simple project developed in NodeJS, where it's possible to create users and in an authenticated route, you're able to list them

## Technologies/Frameworks

- NodeJS
- Typescript
- Express
- Prisma
- Bcrypt
- JWT
- Mysql running on Docker
- Jest

## How to run the project

Make sure you have Node/NPM/Docker installed and the .env file configured, then you're able to follow all the next steps:

1. it will clone the remote repository to your local directory

```
git clone https://github.com/rafaelmindicelo/login.git
```

2. to access your local directory

```
cd login/
```

3. to install all dependencies

```
npm i
```

4. to build and run a mysql container

```
docker-compose up -d
```

5. to generate and apply all migrations

```
npx prisma migrate dev
```

6. to run the project

```
npm run dev
```

7. you're able to run the tests with the following command:

```
npm test
```

(The server will run on the port configured in the .env file or on port 3000)
