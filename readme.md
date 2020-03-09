### What do we have here?
A small gym system composed by a RESTful API made with Node Js, serving the gym admin system made with ReactJS and a members mobile application made with React Native.

## Want to install?

### Basic Requirements

- **NodeJs**
- **Npm** or **Yarn** (commands listed below with yarn)
- **Docker or database remote**
- **Sequelize CLI**
- **Expo or Android and/Or IOS development environment well setted-up**
- **MailTrap** account
- **Sentry** account

### Running Backend API

1. Clone or Download this repo
2. Open terminal on this repo folder
3. Make shure you have **.env** file configured with database connections of your choice based on **docker-compose.yml** file or use a remote option like I did.
4. Run Scripts (one after another finishes):
  - Install dependencies:  `yarn install-backend`
  - Load containers: `yarn compose`
  - Populate Postgres DB: `yarn populate`
5. With all setted up, you can now awake the API and get it running on port **3333**:
  - Go to **backend** dir and run `yarn dev`
  - Open another terminal window at **backend** dir and run `yarn queue`
  - **Note that this will make application and job list run simultaneously**

**At this point you should have your API awake and running**

## Running Front-End

1. In terminal go to **/frontend** dir
2. Run scripts:
  - Install dependencies:  `yarn install`
  - To start application:  `yarn start`
  - With front-web running in development mode you can now make login:
    - `USER: admin@gympoint.com`
    - `PASS: 123456`

**At this point you should have your Front-end web built with ReactJs awake and running on port 3000**

## Running Front-End Mobile
  
1. In terminal go to **/mobile** dir
2. Run scripts:
  - Install dependencies:  `yarn install`
  - To start application:  `expo start or yarn start`
