# crud-vuejs-adonis5

#create docker mysql

docker run --name mysqldb -v mysqldbvol:/var/lib/mysql -p 3306:3306 -e MYSQL_ROOT_PASSWORD=root  -d mysql/mysql-server:latest --default-authentication-plugin=mysql_native_password
docker exec -it mysqldb mysql -uroot -p
create database hospital;

# Install packges




cd frontend

yarn

yarn dev


cd backend

yarn

## run migration

yarn run:m 

yarn dev
