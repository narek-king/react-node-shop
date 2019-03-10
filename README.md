# react-node-shop
online shop with nodejs back end and react front end

### Technology stack

- Node.js v8.9
- React v16
- Express
- Babel
- WebPack 4
- MongoDB

### Perquisites for running the app

- Node.js >= 8
- MongoDB >= 3.2
- MySql (optional: for migrating database only)

### For first run execude commands
 - `git clone https://github.com/narek-king/react-node-shop.git`
 - `cd react-node-shop`
 - `npm install`
 - `npm run build`

### For database setup there are two options

- first to run `mongorestore --db = turing-shop -dir = <Path to react-node-shop>/database/turing-shop`
- for second option you need MySQL running locally
- ... Import database/tshirtshop.sql
- ... Update MySQL credentials in `config/store.js` file
- ... Run `node -r esm scripts/convert-sql-to-noSql.js`

### For running the application, there are 2 options

1. run `npm run start`
2. with pm2.
- install pm2 by running `npm install pm2 -g`
- run `pm2 start pm2.json`

##### Locally the application is running at http://localhost:3010 and the API at http://localhost:3011

### Troubleshooting

- Sometimes `node-sass` dosn't install properly and `npm run build` fails.
In this case reinstall `node-sass` by running `npm i node-sass`.
- The `theme` i.e. front end is installed as npm package. If during the build the Wbpack cannot resolve something from `theme` go to the theme directory and run `npm install` also run `npm install` in project root directory then retry to build.