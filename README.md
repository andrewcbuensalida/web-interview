creating mysql database.
https://www.youtube.com/watch?v=3YrOOia3-mo
using mysql workbench
right click on left section, then create schema which is the database in express server.
to connect to database through shell, open mysqlsh.exe, then
\c --mysql root@localhost/babylon
then run in sql mode
\sql
now can do
show databases
to show databases
then because different versions use different encryption, to allow node to login to mysql,
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY '<password>'

now trying to post an appointment and iso 8601 dateTime from front end is not compatible with mysqls datetime.
just saved iso 8601 to a string in mysql.

no capitalized letters allowed in mysql tables, so availableslots.

==========================================================================================
now trying to import appointments.json into mysql, in mysqlsh.exe, make sure it's in JS mode, not SQL,
util.importJson("C:\swe\babylon-web-interview\server\data\appointments.json", {schema: "babylon", table: "availableslots"})
gives an error an X protocol session is require for JSON import.

check if X protocol is enabled,
mysqlsh -u root --sqlc -P 33060 -e "SHOW plugins"
says
Protocol mismatch; server version = 11, client version = 10
then tried this to activate, but says already in classic mode, unable to change to X protocol with option --mysqlx
mysqlsh -u root --sqlc -P 33060 -e "SHOW plugins" --mysqlx

now trying a different method, in cmd, in the folder of mysqlsh.exe,
mysqlsh root@localhost:33060/babylon -- util importJson "C:\swe\babylon-web-interview\server\data\appointments.json" --table=availableslots

the error says JSON document contains invalid bytes at the beginning of the file

now trying this
https://stackoverflow.com/questions/17367325/importing-json-into-mysql
convert appointments.json into csv, then
LOAD DATA INFILE 'C:\swe\babylon-web-interview\server\data\appointments.csv' INTO TABLE availableslots;

now the error is ,
The MySQL server is running with the --secure-file-priv option so it cannot execute this statement
so to check where to save the csv,
SHOW VARIABLES LIKE "secure_file_priv";
it says
C:\ProgramData\MySQL\MySQL Server 8.0\Uploads\
so moving it there

now
LOAD DATA INFILE 'C:\ProgramData\MySQL\MySQL Server 8.0\Uploads\appointments.csv' INTO TABLE availableslots;

it still gives the secure-file error so
LOAD DATA INFILE 'appointments.csv' INTO TABLE availableslots;

still the same error.

now trying this
LOAD DATA LOCAL INFILE 'C:\swe\babylon-web-interview\server\data\appointments.csv' INTO TABLE availableslots;

now the error is
Loading local data is disabled; this must be enabled on both the client and server sides

now trying to reverse slashes
LOAD DATA INFILE 'C:/ProgramData/MySQL/MySQL Server 8.0/Uploads/appointments.csv' INTO TABLE availableslots;

make sure you're in \sql mode,
now the error is Incorrect integer value: 'id,consultantType,appointmentType,time' for column 'id' at row 1

removed the labels in the csv file

now the error is
Data truncated for column 'id' at row 1

i dont think the csv method will work because the array literally says Array

so try this again, in mysqlsh.exe
\c --mysqlx root@localhost:33060/babylon
then
util.importJson("C:/swe/babylon-web-interview/server/data/appointments1.json", {schema: "babylon", table: "availableslots"})
still errors
JSON document contains invalid bytes (5b) at the begining of the file. (RuntimeError)

just realized i've been calling it appointments instead of availableSlots, but shouldn't make a difference.

what worked is in workbench, right click available slots table, import wizard, then import the available slots json.

# now deploying to aws

aws route 53, hosted zone anhonestobserver.com create record www. and naked babylon.anhonestobserver.com A record with value <ip address>
sudo nano /etc/nginx/sites-available/babylon.anhonestobserver.com.conf
server {
listen 80;
server_name babylon.anhonestobserver.com www.babylon.anhonestobserver.com;

location / {
try_files $uri /index.html;
}

location /api/v1 {
proxy_pass http://localhost:3400/api/v1;
proxy_http_version 1.1;
proxy_set_header Upgrade $http_upgrade;
proxy_set_header Connection 'upgrade';
proxy_set_header Host $host;
proxy_cache_bypass $http_upgrade;
}
}
sudo ln -s /etc/nginx/sites-available/babylon.anhonestobserver.com.conf /etc/nginx/sites-enabled/
sudo systemctl reload nginx
to get ssl aka https:
sudo certbot --nginx
to get url of git repo,
git config --get remote.origin.url
then
git clone <url of git repo>
rename folder with
mv <folder> babylon
DO NOT NPM I IN CLIENT FOLDER, IT WILL CRASH. BUILD FOLDER ALREADY HAS DEPENDENCIES, at least if you're doing it from ssh from vs code.
cd into server folder with index.js
npm i
pm2 start index.js --watch --name babylon
pm2 ls to check running servers
watch is so it reloads when files change, aka git pull.
to auto restart pm2 on compute engine reboot, if you havent already,
pm2 startup
if you have already, just
pm2 save
to see what ports pm2 processes are running on.
ss -tnlp | grep "node /"
to check logs,
pm2 logs flex --timestamp

=============================================================
installing mysql on ubuntu
https://www.digitalocean.com/community/tutorials/how-to-install-mysql-on-ubuntu-20-04
sudo apt update
sudo apt install mysql-server
sudo mysql_secure_installation
sudo mysql

create a data dump file on local workbench > server menu > export > refresh > select schema (babylon) > export to self contained file > include create schema

then to import data
in ubuntu,
sudo mysql -u root -p
CREATE DATABASE babylon;
press ctrl + D
sudo mysql -u root -p babylon < seed.sql

gets an error
ERROR 1064 (42000) at line 1: You have an error in your SQL syntax; check the manual
that corresponds to your MySQL server version for the right syntax to use near 'NOT E
XISTS `babylon` /\*!40100 DEFAULT CHARACTER SET

just paste in notepad or search bar, then repaste into seed.sql in ubuntu.
now log back in
sudo mysql -u root -p
USE babylon
SHOW TABLES;

says empty set.

now trying to export via mysqlsh
download zip from https://dev.mysql.com/downloads/mysql/
copy mysqldump.exe
go to that folder in cmd
mysqldump -u root -p babylon > seleseseed.sql

still empty set.

turns out, i had to use the original exported dump file sql, not just copy the contents of it.


=====================================================================================================
now getting this error when manually inputting url of api
{
code: "ER_NOT_SUPPORTED_AUTH_MODE",
errno: 1251,
sqlMessage: "Client does not support authentication protocol requested by server; consider upgrading MySQL client",
sqlState: "08004",
fatal: true
}

so try this
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password'

now it's working

======================================================================================
since aws is getting expensive, so workflow is 
in client
npm start
and in server
nodemon index.js
when developing, when finished,
npm run build
, then push to gh, then on ubuntu git pull. 
pm2 should auto restart due to changes.


==========================================
now adding react router
