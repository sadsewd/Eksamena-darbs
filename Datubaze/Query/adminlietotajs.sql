CREATE USER admin@localhost IDENTIFIED BY 'vHCMkV0@wb5c';
GRANT SELECT, INSERT, UPDATE, DELETE on *.* to 'admin'@'localhost';
ALTER USER 'admin'@'localhost' IDENTIFIED WITH mysql_native_password BY 'vHCMkV0@wb5c';
