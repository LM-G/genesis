# Genesis
Training on angular 2, webpack, karma, jasmine
ExpressJS, Socket io, JWT

## Set-Up


- Git
- NodeJS 6.9.1
- MongoDB
- Typescript 2.0.6
- Rimraf
- SublimeText3 or IDE (WebStorm)

### Bower

Installation client :
```javascript
$ cd client
$ npm run clean-install
```

Installation backend:
```javascript
$ cd server
$ npm i
```

### Launch front-end webpack dev server

Installation :
```javascript
$ cd client
$ npm start
```

### Launch DataBase
Go to root (optional) and launch this command in new terminal
```javascript
$ mongod
```

### Launch backend
```javascript
$ cd server
$ npm start
```

### Livereload
It is automatic with webpack dev server

## Must have
- [GitHub](https://desktop.github.com/) client for windows
- [MongoDB](https://robomongo.org/) client
- [PostMan](https://chrome.google.com/webstore/detail/postman/fhbjgbiflinjbdggehcddcbncdddomop) to test REST calls


## Debugging

```javascript
$ npm i -g node-inspector
```
In new terminal:
```javascript
$ node-inspector
```

Then 
```javascript
$ cd client
$ npm test
```
to launch all test on time, or
```javascript
$ cd client
$ npm run test-watch
```
to launch all tests in watch mode (nice for debugging them with karma in browser tab, port 9876)