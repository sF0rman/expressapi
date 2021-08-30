# DotENV Variables

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

SMTP_HOST=smtp.google.com  
SMTP_PORT=2525  
SMTP_USER=myuser@gmail.com  
SMTP_PASS=1234  
FROM_EMAIL=noreply@expressapi.com  
FROM_NAME=ExpressAPI  
