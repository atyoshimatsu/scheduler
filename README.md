# Interview Scheduler
Interview Scheduler is an app that manages interviewers and interviewees using React.

## Final Product
### View
#### Book an interview
!["Screenshot of booking an interview"](https://github.com/atyoshimatsu/scheduler/blob/feature/readme/docs/create_demo.gif)

#### Edit an interview
!["Screenshot of editing an interview"](https://github.com/atyoshimatsu/scheduler/blob/feature/readme/docs/edit_demo.gif)

#### Delete an interview
!["Screenshot of deleting an interview"](https://github.com/atyoshimatsu/scheduler/blob/feature/readme/docs/delete_demo.gif)

## Getting Started
### Run the APP
1. Clone your repository onto your local device.
2. Install dependencies using the `npm install` command.
3. Start the web server using the `npm run start` command. The app will be served at <http://localhost:8000/>.
4. Also needed to be run API server on port 8001. See [Run the API Server](#run-the-api-server)
5. Go to <http://localhost:8000/> in your browser.

### Run the API Server
1. Clone the API server repository onto your local device from https://github.com/atyoshimatsu/scheduler-api.
2. Move to Scheduler-api project forder.
3. Login your local psql and using the `CREATE DATABASE scheduler_development` command.
4. Migrate schemas using the `\i src/db/schema/create.sql` command.
5. Insert records using the `\i src/db/schema/development.sql` command.
6. Logout from psql and install dependencies `npm install` command.
7. Start the API server using the `npm run start` command.

## Running Webpack Development Server

```sh
npm run start
```

## Running Jest Test Framework

```sh
npm test
```

## Running Storybook Visual Testbed

```sh
npm run storybook
```

## dependencies
- @babel/eslint-parser
- axios
- classnames
- eslint
- eslint-config-prettier
- eslint-plugin-prettier
- jsx-runtime
- normalize.css
- react
- react-dom
- react-scripts

## devDependencies
- @babel/core
- @babel/preset-react
- @storybook/addon-actions
- @storybook/addon-backgrounds
- @storybook/addon-links
- @storybook/addons
- @storybook/react
- @testing-library/jest-dom
- @testing-library/react
- @testing-library/react-hooks
- babel-loader
- eslint-plugin-cypress
- eslint-plugin-flowtype
- eslint-plugin-react
- prettier
- prop-types
- react-test-renderer
- sass

## Stretch Features
- Using Resucers
- Updating spots remaining with reducers
- Connecting to a Web a WebSocket Server
- Create constants file to manage constant variables
- Setting up ESlint and babel
