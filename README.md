# Quantum Anomaly Boiler Plate

## Prerequesites to run locally and develop

[Node](https://nodejs.org/en/) and [Nodemon](https://www.npmjs.com/package/nodemon) globally installed and postgres database.  
Node version min `6.11.x`  
NPM version min `5.3.x`

On your local, you need to create `.env` file in root of project. Content of the file is supposed to be

```
DATABASE_URL=postgres://USERNAME:PASSWORD@HOST:PORT/DB-NAME
DATABASE_SECRET=YOUR-SECRET
PORT=HERE-GOES-YOUR-PORT
USER_AGENT={'User-Agent': 'YOUR USER AGENT FOR SERVER TO SERVER CALLS'}
GOOGLE_CLIENT_ID=HERE-GOES-YOUR-CLIENT-ID
GOOGLE_CLIENT_SECRET=HERE-GOES-YOUR-SECRET
GOOGLE_CALLBACK_URL=HERE-GOES-YOUR-URL
REGISTRATION=true
```

#### NPM tasks
Currently there are 2 `package.json` files. 

The one in the root of the project handles `node` code. It has following scripts:
- `npm run start` runs `express` server which starts your backend (uses `Nodemon`)
- `npm run build` builds files in `server` with babel and outputs to `/build` folder (production task)
- `npm run heroku-postbuild` this is Heroku script to build both backend and frontend (production task)
- `npm run migrate-eve-data` this is a task which imports all needed information from EVE Online database dump (please refer to next section for details)

Second one is located in `/frontend` folder and handles `react` code. It has following scripts:
- `npm run start` starts react dev server and compiles assets, also starts `sass` watchers
- `npm run build` builds react file for production ready environment and outputs to `/frontend/build`

To run project, you need to `npm run start` in root of the project to start the server and `npm run start` in `/frontend` folder to get frontend running.  
Keep in mind that `react` frontend is running inside webpack development server which is set to proxy to port 3000. If you are using some other port for your server you will need to update `package.json` in `/frontend` folder

### Data migration from EVE online database
If you choose to run this locally, you need to populate your database with EVE Online database data. In order to do that you need to add to your `.env` variables following
```
DATABASE_URL_LIVE=postgres://USERNAME:PASSWORD@HOST:PORT/DB-NAME?ssl=true
EVE_DATABASE_URL=postgres://USERNAME:PASSWORD@HOST:PORT/DB-NAME
UPDATE_LIVE=false
```
`EVE_DATABASE_URL` is the connection string to postgres database with public schema in which you restored EVE online database.  
`DATABASE_URL_LIVE` is the optional connection string to postgres database if you want to run this task on server which is not same as your `DATABASE_URL` and along it you have flag `UPDATE_LIVE` to switch which database to use as destionation.  
General idea is that your `DATABASE_URL` would be localhost in dev environment, and `DATABASE_URL_LIVE` can for example be running on Heroku. From there you can choose in which database to export just by simple flag switching.  
If your database does not require SSL active, please remove `?ssl=true` to your connection string

### Contribution 

If you wish to contribute, please make sure your code follows [Code Guide](code-style.md)  
Commit messages are in format of 

```
Type: Short description

- optional additional point
- optional additional point
```

Always branch out from develop and name new branch `type/veryShortDescription`  
Type can be `feature`, `fix`, `refactor`, `chore`.

Example:
```
Feature: Force https on production environments

 - add option to force https
 - make this default on production
```
or without extra points
```
Feature: Force https on production environments
```
on branch `feature/https`


## Stack

### Backend

Backend is running on [node express](https://www.npmjs.com/package/express) server with [sequelize](https://www.npmjs.com/package/sequelize)
used for Postgres database management. Authentication is being done with `('passport-google-oauth').OAuth2Strategy;`  
Config file: `server/config.js`  
Main database file: `server/database.js`  
Main routes file: `routes/routes.js`

### Frontend

Frontend is running on [React](https://facebook.github.io/react/) and it is based on [create-react-app](https://github.com/facebookincubator/create-react-app). It is also using `sass` for css.  
CSS entry point is: `/frontend/src/styles/main.scss`, base css is contained inside `/frontend/src/styles/` folder, while components are directly in `/frontend/src/components/`  
React entry point is: `/frontend/src/index.js`
