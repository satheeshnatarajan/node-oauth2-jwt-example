# Node Project Setup
- Node boilerplate code 
- Configured OAuth2 login with JWT
- [Eslint](https://eslint.org/), [Prettier](https://prettier.io/), Custom `logger` has configured for best practice of coding


# 1) Prerequisites
Please install the following software:
1) ***Node JS (v 10+)*** 
2) ***NPM (v 6+)***


# 2) Project Setup
Install the dependencies
```
npm install
```

# 3) Before start the project
- Config required environmental variables in `.env` file
- Used `mysql` in this project. Change dialect whatever you want which sequelize support database in `confighook.js` file
- Using sequelize-cli migration, will create database, tables and insert default records 
- Create database by `npm run db:create`
- Once DB created, create users table. Run `npm run db:migrate`
- Insert few records into users. Run `npm run db:seed:all`

# 3) Run the Project
```
npm run start
```

Use cURL / Postman to validate Authorization and Authentication API
NOTE: Basic token should be replaced by btoa(clientId:clientSecret) which configure in environment variables
 - Login API
> curl --location --request POST 'http://localhost:5000/auth/login' \
> --header 'Authorization: Basic <clientId:clientSecret>' \
> --header 'Content-Type: application/x-www-form-urlencoded' \
> --data-urlencode 'grant_type=password' \
> --data-urlencode 'username=admin' \
> --data-urlencode 'password=admin'

- Get All Users Secure API (Replace accesstoken from login api response)
> curl --location --request GET 'http://localhost:5000/api/v1/users' \
--header 'Authorization: Bearer <accesstoken>'


# 4) Logger
The Project includes a custom logger for development and error tracking, please use in the code the most appropriate log level 
based on your use case. Custom logger and log level for application and database queries.

````
logger.debug('information for development ');
logger.log('information for development - production');
logger.info('useful information at runtime');
logger.warn('something unusual happened but we can manage');
logger.error('something broke and we will notify the server or do some special handling');
````

As part of the log message you can also send data that can reviewed in the Browser Console, where you can also filter by log levels:
````
logger.debug('information for development: ', item.price);
logger.warn('Service Error: ', response.error);
````
> NOTE: `logger` available in global. No need to import.


# 5) Lint - Code Style Guideline
Using **Eslint** to establish a code style guideline that we should follow, in order to merge the code we should comply with the
linter and do not include lint errors as part of the code.

````
npm run elint
````
This command will execute the lint process and provide feedback on warnings and errors.

````
npm run elint:fix
````

# 6) Prettier - Code Format Style Guideline
Using **Prettier** to establish a code formatting guideline that we should follow.

````
npm run prettier
````
This command will execute the lint process and provide feedback on warnings and errors.

````
npm run prettier:fix
````
This command will execute the formatting process and will automatically fix all the errors that could be fixed by not introducing a side effect, it will do its best 
to save some time to fix the most common formatting errors.

# Third party libraries Documentation
* [Express.js](https://expressjs.com/en/5x/api.html)
* [Sequelize](https://sequelize.org/master/)
* [Sequelize-cli](https://github.com/sequelize/cli)
* [oauth2-server](https://oauth2-server.readthedocs.io/en/latest/)
* [JsonWebToken](https://github.com/auth0/node-jsonwebtoken)
* [Winston Logger](https://github.com/winstonjs/winston)
