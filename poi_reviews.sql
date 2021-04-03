USE webAE;
DROP TABLE IF EXISTS `poi_users`;

CREATE TABLE poi_users
(id INT PRIMARY KEY AUTO_INCREMENT,
username VARCHAR(255),
password VARCHAR(255)) ;

INSERT INTO poi_users(username,password) VALUES ('tim','tim123'),('kate','kate123');
