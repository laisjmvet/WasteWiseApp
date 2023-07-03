-- drop tables if they exist
DROP TABLE IF EXISTS addresses_Abingdon;
DROP TABLE IF EXISTS token;
DROP TABLE IF EXISTS user_account;
DROP TABLE IF EXISTS recycling_object;
DROP TABLE IF EXISTS materials_type; 
DROP TABLE IF EXISTS collect_days;
DROP TABLE IF EXISTS address_zones;
DROP TABLE IF EXISTS collect_furniture_weight;
DROP TABLE IF EXISTS collect_furniture_price;
DROP TABLE IF EXISTS weekdays;
DROP TABLE IF EXISTS bin_types;

CREATE TABLE weekdays (
    weekday_id INT GENERATED ALWAYS AS IDENTITY,
    weekday VARCHAR UNIQUE NOT NULL,
    PRIMARY KEY (weekday_id)
);

CREATE TABLE address_zones (
    zone_id INT GENERATED ALWAYS AS IDENTITY,
    zone_number INT NOT NULL,
    PRIMARY KEY(zone_id)
);

CREATE TABLE addresses_Abingdon (
    address_id INT GENERATED ALWAYS AS IDENTITY,
    street_name VARCHAR NOT NULL,
    street_number INT NOT NULL,
    postcode VARCHAR NOT NULL,
    zone_id INT NOT NULL,
    PRIMARY KEY (address_id),
    FOREIGN KEY (zone_id) REFERENCES address_zones(zone_id)
);

CREATE TABLE user_account (
    user_id INT GENERATED ALWAYS AS IDENTITY,
    username VARCHAR(30) UNIQUE NOT NULL,
    password VARCHAR(8) NOT NULL,
    points INT NOT NULL,
    isAdmin BOOLEAN NOT NULL DEFAULT FALSE,
    PRIMARY KEY (user_id)
);

CREATE TABLE token (
    token_id INT GENERATED ALWAYS AS IDENTITY,
    user_id INT NOT NULL,
    token CHAR(36) UNIQUE NOT NULL,
    PRIMARY KEY (token_id),
    FOREIGN KEY (user_id) REFERENCES user_account(user_id)
);


CREATE TABLE bin_types (
    bin_type_id INT GENERATED ALWAYS AS IDENTITY,
    bin_type_name VARCHAR UNIQUE NOT NULL, 
    PRIMARY KEY (bin_type_id)
);

CREATE TABLE materials_type (
    material_type_id INT GENERATED ALWAYS AS IDENTITY,
    name VARCHAR UNIQUE NOT NULL,
    PRIMARY KEY (material_type_id)
);

CREATE TABLE collect_days (
    collect_day_id INT GENERATED ALWAYS AS IDENTITY,
    bin_type_id INT NOT NULL,
    weekday_id INT NOT NULL,
    zone_id INT NOT NULL,
    PRIMARY KEY (collect_day_id),
    FOREIGN KEY (bin_type_id) REFERENCES bin_types(bin_type_id),
    FOREIGN KEY (weekday_id) REFERENCES weekdays(weekday_id),
    FOREIGN KEY (zone_id) REFERENCES address_zones(zone_id)
);

CREATE TABLE recycling_object (
    object_id INT GENERATED ALWAYS AS IDENTITY,
    name VARCHAR NOT NULL,
    --NEEDS TO MAKE THE NAME UNIQUE
    material_type_id INT NOT NULL,
    bin_type_id INT NOT NULL,
    PRIMARY KEY (object_id),
    FOREIGN KEY (bin_type_id) REFERENCES bin_types(bin_type_id),
    FOREIGN KEY (material_type_id) REFERENCES materials_type(material_type_id)  
);

CREATE TABLE collect_furniture_price (
    price_id INT GENERATED ALWAYS AS IDENTITY,
    price INT NOT NULL,   
    PRIMARY KEY (price_id)
);

CREATE TABLE collect_furniture_weight (
    weight_id INT GENERATED ALWAYS AS IDENTITY,
    weight_kg INT NOT NULL, 
    price_id INT NOT NULL,  
    PRIMARY KEY (weight_id),
    FOREIGN KEY (price_id) REFERENCES collect_furniture_price(price_id)
);

INSERT INTO weekdays (weekday)
VALUES ('Sunday'), ('Monday'), ('Tuesday'), ('Wednesday'), ('Thursday'), ('Friday'), ('Saturday');

INSERT INTO bin_types (bin_type_name) VALUES('General Waste'), ('Recycling'), ('Food Waste'), ('Garden Waste'), ('Clear bag'), ('Large Supermarkets'), ('Needs Collection');

INSERT INTO materials_type (name) VALUES
('Plastic'), ('Paper'), ('Glass'), ('Metal'), ('Small Electronics'), ('Food'), ('Textiles'), ('Batteries'), ('Garden'), ('Bulky waste');

INSERT INTO recycling_object (name, material_type_id, bin_type_id) VALUES
('Plastic water bottle', 1, 2),
('Plastic milk jug', 1, 2),
('Plastic food container', 1, 2),
('Plastic laundry detergent bottle', 1, 2),
('Plastic shampoo bottle', 1, 2),
('Plastic soda bottle', 1, 2),
('Plastic yogurt container', 1, 2),
('Plastic coffee cup lid', 1, 2),
('Plastic straw', 1, 2),
('Plastic toy', 1, 2),
('Newspaper', 2, 2),
('Cardboard box', 2, 2),
('Office paper', 2, 2),
('Paper grocery bag', 2, 2),
('Magazine', 2, 2),
('Paper envelope', 2, 2),
('Cardboard packaging', 2, 2),
('Paper towel', 2, 2),
('Wrapping paper', 2, 2),
('Paperback book', 2, 2),
('Cardboard shipping box', 2, 2),
('Cardboard cereal box', 2, 2),
('Cardboard pizza box', 2, 2),
('Cardboard drink carrier', 2, 2),
('Cardboard tube (from paper towels or toilet paper)', 2, 2),
('Cardboard file folder', 2, 2),
('Cardboard shoebox', 2, 2),
('Cardboard appliance box', 2, 2),
('Cardboard egg carton', 2, 2),
('Cardboard packaging materials', 2, 2),
('Glass bottle (e.g., wine bottle, beer bottle)', 3, 2),
('Glass jar (e.g., jam jar, pickle jar)', 3, 2),
('Glass drinking glass', 3, 2),
('Glass food container', 3, 2),
('Glass perfume bottle', 3, 2),
('Glass vase', 3, 2),
('Glass candle holder', 3, 2),
('Glass picture frame', 3, 2),
('Glass ashtray', 3, 2),
('Glass window pane', 3, 2),
('Aluminum soda can', 4, 2),
('Tin food can', 4, 2),
('Aluminum foil', 4, 2),
('Metal hanger', 4, 2),
('Metal cooking pot', 4, 2),
('Metal utensils (fork, spoon, knife)', 4, 2),
('Metal wire', 4, 2),
('Metal door handle', 4, 2),
('Metal key', 4, 2),
('Metal nail', 4, 2),
('Mobile phone', 5, 7),
('Laptop computer', 5, 7),
('Television', 5, 7),
('Digital camera', 5, 7),
('Printer', 5, 7),
('Video game console', 5, 7),
('DVD player', 5, 7),
('MP3 player', 5, 7),
('Computer monitor', 5, 7),
('Electronic tablet', 5, 7),
('Fruit peelings', 6, 3),
('Vegetable scraps', 6, 3),
('Eggshells', 6, 3),
('Coffee grounds', 6, 3),
('Tea bags', 6, 3),
('Bread crusts', 6, 3),
('Pasta leftovers', 6, 3),
('Rice leftovers', 6, 3),
('Meat bones', 6, 3),
('T-shirt', 7, 5),
('Jeans', 7, 5),
('Dress', 7, 5),
('Socks', 7, 5),
('Sweater', 7, 5),
('Towel', 7, 5),
('Bedsheet', 7, 5),
('Curtains', 7, 5),
('Pillowcase', 7, 5),
('Tablecloth', 7, 5),
('AA batteries', 8, 5),
('AAA batteries', 8, 5),
('Button cell batteries', 8, 5),
('Rechargeable batteries', 8, 5),
('Laptop battery', 8, 5),
('Car battery', 8, 5),
('Watch battery', 8, 5),
('Camera battery', 8, 5),
('Remote control battery', 8, 5),
('Hearing aid battery', 8, 5),
('Grass clippings', 9, 4),
('Leaves', 9, 4),
('Tree branches', 9, 4),
('Plant trimmings', 9, 4),
('Weed clippings', 9, 4),
('Flower bouquets', 9, 4),
('Garden soil', 9, 4),
('Mulch', 9, 4),
('Compost', 9, 4),
('Potted plants (when no longer wanted)', 9, 4),
('Plastic grocery bags', 1, 6),
('Plastic bread bags', 1, 6),
('Plastic food wrappers', 1, 6),
('Plastic packaging film', 1, 6),
('Plastic bubble wrap', 1, 6),
('Plastic ziplock bags', 1, 6),
('Plastic cling wrap', 1, 6),
('Plastic shrink wrap', 1, 6),
('Plastic cereal bag liners', 1, 6),
('Plastic produce bags', 1, 6);

--!!!!!!!!!!NEEDS TO THIS DATABASE ABOUT THE RECYCLING

INSERT INTO user_account (username, password, isAdmin) VALUES
('laisjm', 'lais', true);

INSERT INTO collect_furniture_price (price) VALUES
(100);

INSERT INTO collect_furniture_weight (weight_kg, price_id) VALUES
(20, 1);

INSERT INTO address_zones(zone_number) VALUES
(1), (2), (3), (4);

INSERT INTO addresses_Abingdon (street_name, street_number, postcode, zone_id)
VALUES
    ('Elm Street', 1, 'AB1 2CD', 1),
    ('Oak Avenue', 2, 'AB2 3EF', 1),
    ('Maple Close', 3, 'AB3 4GH', 1),
    ('Beech Road', 4, 'AB4 5IJ', 1),
    ('Cedar Lane', 5, 'AB5 6KL', 1),
    ('Willow Court', 6, 'AB6 7MN', 2),
    ('Pine Crescent', 7, 'AB7 8OP', 2),
    ('Ash Drive', 8, 'AB8 9QR', 2),
    ('Birch Terrace', 9, 'AB9 0ST', 2),
    ('Holly Way', 10, 'AB1 1UV', 3),
    ('Elm Street', 11, 'AB2 2WX', 3),
    ('Oak Avenue', 12, 'AB3 3YZ', 3),
    ('Maple Close', 13, 'AB4 4AB', 3),
    ('Beech Road', 14, 'AB5 5CD', 3),
    ('Cedar Lane', 15, 'AB6 6EF', 4),
    ('Willow Court', 16, 'AB7 7GH', 4),
    ('Pine Crescent', 17, 'AB8 8IJ', 4),
    ('Ash Drive', 18, 'AB9 9KL', 4),
    ('Birch Terrace', 19, 'AB0 0MN', 4),
    ('Holly Way', 20, 'AB1 1OP', 4);

INSERT INTO collect_days (bin_type_id, weekday_id, zone_id) VALUES
(1, 3, 4), (2, 3, 4), (2, 3, 2);

