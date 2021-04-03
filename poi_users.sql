USE webAE;
DROP TABLE IF EXISTS `poi_reviews`;

CREATE TABLE poi_reviews
(id INT PRIMARY KEY AUTO_INCREMENT,
poi_id INT,
review TEXT);
