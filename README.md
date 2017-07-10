# Genesis

Training on angular 4, webpack 3, karma, jasmine
ExpressJS, Socket io, JWT

## Set-Up

- Git
- NodeJS 8.1.2
- MongoDB
- Typescript 2.4.3
- Rimraf

### libraries installation

client :
```javascript
$ cd client
$ npm run clean-install
```

server :
```javascript
$ cd server
$ npm i
```

### Start front-end dev server

JIT compilation :
```javascript
$ cd client
$ npm start
```

JIT compilation + Hot module Replacement:
```javascript
$ cd client
$ npm start:hmr
```

### Launch DataBase
Go to root (optional) and launch this command in new terminal
```javascript
$ mongod
```

### Start api server
```javascript
$ cd server
$ npm start
```


## Must have
- [GitHub](https://desktop.github.com/) client for windows
- [MongoDB](https://robomongo.org/) client
- [PostMan](https://chrome.google.com/webstore/detail/postman/fhbjgbiflinjbdggehcddcbncdddomop) to test REST calls


## Debugging backend server

```javascript
$ npm i -g node-inspector
```
In new terminal:
```javascript
$ node-inspector
```

## Unit tests

Client 
```javascript
$ cd client
$ npm test
```
```javascript
$ cd client
$ npm run test-watch
```