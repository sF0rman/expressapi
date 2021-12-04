Node.js / Express API template to be used as a base for other projects

# DotENV Variables

````
DEVELOPMENT=true  

SERVER_PORT=1337  
SERVER_HOST=localhost  

DB_HOST=localhost  
DB_PORT=5431  
DB_TYPE=postgres  
DB_USER=admin  
DB_PASS=yourpassword  
DB_NAME=yourdbname  
DB_HEALTHCHECK=psql -U admin -d postgres -c 'SELECT'  

JWT_SECRET=yoursecretkey  
JWT_EXPIRE=30d  
COOKIE_EXPIRE=30 
````
