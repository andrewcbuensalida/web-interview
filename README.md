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

workflow is yarn build on client when done developing, then push to github, nodemon index.js when developing