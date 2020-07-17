This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

Reactjs.
Typescript.
Bootstrap .
Styled Component.

View [Demo](https://huynhkhanh226.github.io/fe_hkhanh/) 

## Run Project

### `npm install -g typescript`
### `npm install`
### `npm run start`

## Using Atomic design

## Available Scripts

In the project directory, you can run:.

To start this project.
### `npm run start`

To run Unit Test.
### `npm run test`

To build this project.
### `npm run build`

Test package after built
### `npm install -g serve`
### `npm run build`
### `serve -s dist`
### `access to : http:localhost:5000`

## Configuration
### `env.development` => npm run start
### `env.production` => npm run build
### `env.staging` => npm run staging

## Optimizing Performance

### `Build tool is the webpack`
For the best performance, refer to https://reactjs.org/docs/optimizing-performance.html.
webpack.
webpack-cli.
webpack-merge.
html-webpack-plugin.
webpack-manifest-plugin.
mini-css-extract-plugin.
terser-webpack-plugin.
copy-webpack-plugin.

### `Lazy load component`
If the project is bigger, then the download speed is the same.
Refer to: https://reactjs.org/docs/code-splitting.html.

## Deployment

### `IIS and Apache`

### `deploy/web.config` to fix F5 error on IIS.
### `deploy/.htacces` to fix F5 on Apache.

### `Github Page`
File: deploy-git.sh.
Change config in deploy-git.sh file, and run this shell.
And change PUBLIC_URL to PUBLIC_URL=/<your-repos>/.
Your website will deploy on github.
Like this: https://huynhkhanh226.github.io/fe_hkhanh/.

### `Docker`
### `File: Dockerfile, nginx.conf`
Run the below command to build.
### `docker build . -t my-app.`

Run this command to bind port to windows:.
### `docker run -d -p 8080:80 my-app.`

Use chrome to access to http:localhost:8080.

### `Other platform`
GitLab Pages.
Netlify.
Render.
Amazon S3.
Firebase.
Now.
Stdlib.
Heroku.
Surge.
Bitbucket Cloud.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

and learn [webpack](https://webpack.js.org/concepts/)

