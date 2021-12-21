creating mysql database.
https://www.youtube.com/watch?v=3YrOOia3-mo
using mysql workbench
right click on left section, then create schema which is the database in express server.
to connect to database through shell, open mysqlsh.exe, then
\c --mysql root@localhost
then run in sql mode
\sql
now can do
show databases
to show databases
then because different versions use different encryption, to allow node to login to mysql, 
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY '<password>'

now trying to post an appointment and iso 8601 dateTime from front end is not compatible with mysqls datetime. 