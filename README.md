
This is the frontend of my newsapp project. <br />
It is meant to be run in conjunction with the backend [here](https://github.com/krissi1111/NewsAppNet)

The project is set up to run using Docker and can be run using the docker-compose.yml file seen below.

To run the project save the docker-compose.yml file on your computer and then call 

### `docker-compose -f (your path here)\docker-compose.yml up`

assuming you have docker installed.

docker-compose.yml
```

version: '3.4'

volumes:
    news:    

services:
    newsappdb:
        image: "mcr.microsoft.com/mssql/server:2019-latest"
        environment:
            ACCEPT_EULA: Y
            SA_PASSWORD: Password123
        ports:
            - 1433:1433
        volumes:
            - news:/var/opt/mssql

    newsappnet:
        image: stjani11/newsapp_backend:latest
        depends_on:
            - newsappdb
        ports:
            - 5000:80

    newsapp-redux:
        image: stjani11/newsapp_frontend:latest
        ports:
            - 3000:3000
        environment:
            - CHOKIDAR_USEPOLLING=true
            - REACT_APP_BACKEND_PORT=5000
```



This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app), using the [Redux](https://redux.js.org/) and [Redux Toolkit](https://redux-toolkit.js.org/) template.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
