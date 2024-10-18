# This combination

![Docker-compose](https://cdn.hashnode.com/res/hashnode/image/upload/v1662313547352/s0Uk-haLQ.jpg)

![React.js](https://media.licdn.com/dms/image/D4D12AQF26-NZ279EaA/article-cover_image-shrink_600_2000/0/1688018102545?e=2147483647&v=beta&t=Q9aUSt_UHzSqZYyDycri3s2kqVDlPc-YM0ZzlH2yfYc)

![Node.js](https://cdn.gabrieleromanato.com/5c37214980b3/uploads/2018/09/nodejs.jpg)

![Node.js-file-system](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEj6uBjgrkG7E1NVUwP_aUap3J_WWgYotCAfEBPks6MI7FxQL9QXc_saB87lFyfzaMALNTnKcrynAMVq8bPZpkJlfnKwzSVb2fC6jTvRaVy32K8NLyORgxzDwZ8P2OeWpH5h70Avfy5nEb3z/s1600/logo-node.jpg)

![Express.js](https://miro.medium.com/v2/resize:fit:1400/1*gyUa6Qx-xcOR1vHg1IoVkw.png)

![Express.js](https://techievor.com/api/image-uploads/posts/c25b6f75a581b8a7b8200971ac0e993b.png)

![PostgreSQL](https://raw.githubusercontent.com/docker-library/docs/01c12653951b2fe592c1f93a13b4e289ada0e3a1/postgres/logo.png)

##
##
## Start testing this Docker-compose app
```bash
git clone https://github.com/PhoenixYork166/Docker-compose.git
```

```bash
cd Docker-compose
```

## Watch out...We'll need to wait for 3 minutes after
## docker-compose up -d;
## for Node.js => PostgreSQL microservices to start working properly
##
## 1. Start Docker-compose
```bash
docker-compose up -d;
```

##
##
## 2. Check currently running containers
```bash
docker ps -a;
```

##
##
## 3. Inspecting any docker containers status (Frontend/Backend/Database) via logs
## Inspecting Frontend (React.js) container status
```bash
docker logs ai-frontend;
```
## Inspecting Backend (Node.js) container status
```bash
docker logs ai-backend;
```
## Inspecting Database (Postgres) container status
```bash
docker logs ai-postgres;
```

##
##
## 4. Database Administration (Postgres)
## You may enter PostgreSQL database shell (psql) environment for database administration

## This Docker composed Full Stack app mounts PostgreSQL TCP Port 5433
## Instead of TCP Port 5432 on your host machine (macOS/Windows/AWS EC2)
## PostgreSQL password: rootGor
```bash
psql -U postgres -d smart-brain -h 127.0.0.1 -p 5433;
```

## Should you have created any new tables

## Please put all CREATE TABLE .sql files 
## into 
## projectFolder/postgresql/postgres-init/init.sql
## Line 86 -- NEW CREATE TABLE SQL here

## Thus, next time when you recreate this Docker-compose app on other host machines using 
```bash
docker-compose up -d;
```
## You'll have all your postgres tables ready

##
##
## 5. Stop Docker-compose
```bash
docker-compose down;
```

##
##
## 6. Code changes
## You may add on custom features to this Full Stack app
## Rebuild all docker images for this app
```bash
docker-compose down;
docker-compose up --build;
```

##
##
## 7. Should you want to start fresh without any existing docker images & docker containers on your host machine 
## Watch out! This will remove all existing docker images on your host!
```bash
docker-compose down;
bash ./prune-before-docker-compose-up.sh;
```
