## Docker
  
*Host machine* - host thats runs the docker. The host can be Windows, OSX, or Linux.

*Docker Container* - virtual machine that runs system image with needed application. 
It contains list of needed components: OS, node.js, needed libraries, our app.

*Docker Hub* - Public cloud (like github, npm ...), you can upload docker image and then 
download and install it on other machines.

*Dockerfile* - this file includes list of necessary installation for docker image

Image contains layers - layer after layer. Each command is separated layer.

If we created dockerfile that describes image, and we builded this image, and after that 
we changed some layer, then when we rebuild the image again, the system will perform the change only on edited layers.

## Setup Dockerfile

- Install OS with installed node.js. We will use linux alpine - its lightest version of OS, and its good to run docker

```
# Linux alpine 3.17.x (we use specific version - we don"t want latest) with node.js 18
FROM node:18-alpine3.17
```
- Install global libraries:

```
RUN npm i --g ts-node
```

- Create our app directory:
```
WORKDIR /app
```
- Copy only package.json and package-lock.json into /app.
```
COPY package*.json /app
```

- Create .dockerignore to exclude node_modules, Dockerfile, postman collection, and restore libraries in image:
```
RUN npm i
```
- Take current dir (".") and copy to docker image dir ("/app")
```
COPY . /app
```
- When container runs - which command should we use to run our app:
```
ENTRYPOINT npm start
```

- Those commands should be run in terminal:

- Build the image - there are convention for giving name to image: docker-username/image-name:version
```
docker build -t <image-name> <dockerfile location>
Example: docker build -t maxiboom1/kittens-image:1.0 .
```
- Build container which runs image. We need also to port forward local machine to docker container => its called port binding:

```
docker create --name <container-name> -p <host-port:container-port> <image-name>
```

- Run the container:
```
docker start 
```
