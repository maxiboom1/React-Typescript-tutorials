

## NodeJs
  1. [Basics](#Basics)
  1. [NodeJs Installations](#NodeJs-installations)
  2. [Project structure](#Project-structure)
  3. [Node js layered architecture](#Node-js-layered-architecture)
  4. [Middleware](#Middleware)


## **Basics**

Node.js can run javascript on backend server, without browser.
We can implement typescript in Node.js.
There is no window object in Node.js, neither document, alert, browser..

Packages:
Package is an complete Node.js project' and can include many JS (or TS) files.

Modules:
Single js or ts file.
Node.js automatically wraps any module with IIFE (immediatly invoked function expression).
Modules can be:
- Custom module - module that we creating in our projects. Module name is the js (or ts) file name.
- NPM module - the packages and modules that we install from NPM servers. It will be in node_modules folder
- Built-in module - those modules is included in node.js by default and no need to install them.

Package.json file:
Its an project settings file. We can create it with "npm init -y".

Nodemon:
With nodemon we can run node.js with hot-reloading. 

## **NodeJs Installations**

> NodeJs project install:
```
1. npm init -y  => creates package.json project config file.
2. npm i -g nodemon => global install of nodemon tool to hot-reloading.
3. npm i -g ts-node =>  global install of nodejs typescript.
4. npm i @types/node -D => project install of types for nodejs, we install it only for devDependencies (-D).
5. Create tsconfig.json config file with:
    {
        "compilerOptions": {
            "target": "ES6",
            "esModuleInterop": true,
            "moduleResolution": "Node",
        }
    }
6. npm i express => express install, library to manage REST API. 
7. npm i @types/express -D => types for express (with -D)
```
> Tools that may be useful:
```
1. npm i -g javascript-obfuscator  => tool to transform code to make it harder to understand and steal.
2. Postman utility for debugging our server application.
```


## Project structure
Root will contain project config files (package.json, package-lock.json, tsconfig.json) and src folder.

src folder will contain this:

![alt text](screenshots/src-structure.JPG)

The app.ts file 

## Node js layered architecture

A small app consists of three (3) layers: Router Layer, Service Layer, and Data Access Layer (DAL). The number of layers will depend on how complex your app turns out. Router Layer contains the app programming interface (API) routes of the app. Its only job is to return a response from the server.

![alt text](screenshots/layered-architecture1.JPG).

## Middleware

This is a function that is performed automatically between the Request and the Response.

Everything we want to do automatically can be done in middleware, such as writing to logs, preventing malicious information, checking tokens...

Middleware can be registered at the level of the entire site or at the level of a specific route.

Middleware can perform some activity and then continue the flow to the next Middleware or Route (if it exists just before the Route). This is by calling the  NextFunction() function.

Order of middleware registration will be the order of the flow (we register it usually in app.ts).

Middleware can break the flow and return the response:

![alt text](screenshots/middleware.JPG)

## Error handling

There is special middleware function, that gets 4 arguments: err obj, request, response, next. 

We must register it after all routes. If some middleware trigger this func, its skips all other flows and get to this middleware func. Its easy to think about it like all the flow (with all middlewares) was in an "try" segment, while this special middleware is an "catch" segment:

![alt text](screenshots/catchall.jpg)

### Common errors:

500 - Server internal error
404 - Page not found, resource not found (id based route)
400 - Validation error
401 - Unauthorized error
403 - Forbidden (Permission denied)







