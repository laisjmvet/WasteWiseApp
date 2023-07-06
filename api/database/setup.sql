ALTER TABLE IF EXISTS addresses_florin DROP CONSTRAINT IF EXISTS addresses_florin_zone_id_fkey;
ALTER TABLE IF EXISTS user_account DROP CONSTRAINT IF EXISTS user_account_address_id_fkey;
ALTER TABLE IF EXISTS collect_days DROP CONSTRAINT IF EXISTS collect_days_bin_type_id_fkey;
ALTER TABLE IF EXISTS collect_days DROP CONSTRAINT IF EXISTS collect_days_weekday_id_fkey;
ALTER TABLE IF EXISTS collect_days DROP CONSTRAINT IF EXISTS collect_days_zone_id_fkey;
ALTER TABLE IF EXISTS recycling_object DROP CONSTRAINT IF EXISTS recycling_object_bin_type_id_fkey;
ALTER TABLE IF EXISTS recycling_object DROP CONSTRAINT IF EXISTS recycling_object_material_type_id_fkey;
ALTER TABLE IF EXISTS appointments DROP CONSTRAINT IF EXISTS appointments_user_id_fkey;
ALTER TABLE IF EXISTS appointments DROP CONSTRAINT IF EXISTS appointments_weekday_id_fkey;

-- drop tables if they exist
DROP TABLE IF EXISTS token;
DROP TABLE IF EXISTS appointments;
DROP TABLE IF EXISTS user_account;
DROP TABLE IF EXISTS recycling_object;
DROP TABLE IF EXISTS materials_type; 
DROP TABLE IF EXISTS collect_days;
DROP TABLE IF EXISTS collect_bulky_waste;
DROP TABLE IF EXISTS weekdays;
DROP TABLE IF EXISTS bin_types;
DROP TABLE IF EXISTS address_zones;
DROP TABLE IF EXISTS addresses_florin;

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

CREATE TABLE addresses_florin (
    address_id INT GENERATED ALWAYS AS IDENTITY,
    street_name VARCHAR NOT NULL,
    house_number INT NOT NULL,
    postcode VARCHAR NOT NULL,
    zone_id INT NOT NULL,
    PRIMARY KEY (address_id),
    FOREIGN KEY (zone_id) REFERENCES address_zones(zone_id)
);

CREATE TABLE user_account (
    user_id INT GENERATED ALWAYS AS IDENTITY,
    username VARCHAR(30) UNIQUE NOT NULL,
    password VARCHAR NOT NULL,
    points INT DEFAULT 0 NOT NULL,
    address_id INT,
    isAdmin BOOLEAN DEFAULT FALSE NOT NULL,
    PRIMARY KEY (user_id),
    FOREIGN KEY (address_id) REFERENCES addresses_florin(address_id) ON DELETE RESTRICT
);

CREATE TABLE token (
    token_id INT GENERATED ALWAYS AS IDENTITY,
    user_id INT NOT NULL,
    token CHAR(36) UNIQUE NOT NULL,
    PRIMARY KEY (token_id),
    FOREIGN KEY (user_id) REFERENCES user_account(user_id) ON DELETE RESTRICT
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
    FOREIGN KEY (bin_type_id) REFERENCES bin_types(bin_type_id ),
    FOREIGN KEY (weekday_id) REFERENCES weekdays(weekday_id),
    FOREIGN KEY (zone_id) REFERENCES address_zones(zone_id) 
);

CREATE TABLE recycling_object (
    object_id INT GENERATED ALWAYS AS IDENTITY,
    name VARCHAR NOT NULL,
    material_type_id INT NOT NULL,
    bin_type_id INT NOT NULL,
    PRIMARY KEY (object_id),
    FOREIGN KEY (bin_type_id) REFERENCES bin_types(bin_type_id),
    FOREIGN KEY (material_type_id) REFERENCES materials_type(material_type_id)  
);

CREATE TABLE collect_bulky_waste(
    bulky_waste_id INT GENERATED ALWAYS AS IDENTITY,
    weight_kg INT NOT NULL, 
    price INT NOT NULL,  
    PRIMARY KEY (bulky_waste_id)
);

CREATE TABLE appointments (
    appointment_id INT GENERATED ALWAYS AS IDENTITY,
    user_id INT NOT NULL,
    object_name VARCHAR NOT NULL,
    weight_kg INT NOT NULL,
    weekday_id INT NOT NULL,
    PRIMARY KEY (appointment_id),
    FOREIGN KEY (weekday_id) REFERENCES weekdays(weekday_id),
    FOREIGN KEY (user_id) REFERENCES user_account(user_id)

);

INSERT INTO weekdays (weekday)
VALUES ('UNDEFINED'), ('Sunday'), ('Monday'), ('Tuesday'), ('Wednesday'), ('Thursday'), ('Friday'), ('Saturday');

INSERT INTO bin_types (bin_type_name) VALUES ('UNDEFINED'), ('General Waste'), ('Recycling'), ('Food Waste'), ('Garden Waste'), ('Clear bag'), ('Large Supermarkets'), ('Needs Collection');

INSERT INTO materials_type (name) VALUES
('UNDEFINED'), ('Plastic'), ('Paper'), ('Glass'), ('Metal'), ('Small Electronics'), ('Food'), ('Textiles'), ('Batteries'), ('Garden'), ('Bulky waste');

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

INSERT INTO collect_bulky_waste (price, weight_kg) VALUES
(100, 101), (50,100), (30,60), (15,30);

INSERT INTO address_zones(zone_number) VALUES
(0), (1), (2), (3), (4), (5), (6), (7), (8), (9), (10);

INSERT INTO addresses_florin (street_name, house_number, postcode, zone_id)
VALUES

('Apple Street', '1', 'GL1 1AB', 1),
('Apple Street', '2', 'GL1 1AB', 1),
('Apple Street', '3', 'GL1 1AB', 1),
('Apple Street', '4', 'GL1 1AB', 1),
('Cherry Lane', '10', 'GL2 2CD', 1),
('Cherry Lane', '12', 'GL2 2CD', 1),
('Cherry Lane', '14', 'GL2 2CD', 1),
('Orange Avenue', '20', 'GL3 3EF', 1),
('Orange Avenue', '21', 'GL3 3EF', 1),
('Orange Avenue', '23', 'GL3 3EF', 1),
('Orange Avenue', '25', 'GL3 3EF', 1),
('Orange Avenue', '27', 'GL3 3EF', 1),
('Orange Avenue', '28', 'GL3 3EF', 1),
('Pear Road', '30', 'GL4 4GH', 1),
('Pear Road', '32', 'GL4 4GH', 1),
('Pear Road', '34', 'GL4 4GH', 1),
('Pear Road', '36', 'GL4 4GH', 1),
('Pear Road', '37', 'GL4 4GH', 1),
('Pear Road', '38', 'GL4 4GH', 1),
('Pear Road', '40', 'GL4 4GH', 1),
('Blue Sky Boulevard', '50', 'GL5 5IJ', 2),
('Blue Sky Boulevard', '51', 'GL5 5IJ', 2),
('Blue Sky Boulevard', '52', 'GL5 5IJ', 2),
('Blue Sky Boulevard', '54', 'GL5 5IJ', 2),
('Blue Sky Boulevard', '55', 'GL5 5IJ', 2),
('Starry Lane', '60', 'GL6 6KL', 2),
('Starry Lane', '62', 'GL6 6KL', 2),
('Starry Lane', '64', 'GL6 6KL', 2),
('Starry Lane', '65', 'GL6 6KL', 2),
('Starry Lane', '67', 'GL6 6KL', 2),
('Starry Lane', '68', 'GL6 6KL', 2),
('Starry Lane', '69', 'GL6 6KL', 2),
('Galaxy Street', '70', 'GL7 7MN', 2),
('Galaxy Street', '71', 'GL7 7MN', 2),
('Galaxy Street', '73', 'GL7 7MN', 2),
('Galaxy Street', '74', 'GL7 7MN', 2),
('Galaxy Street', '76', 'GL7 7MN', 2),
('Mountain View Road', '80', 'GL8 8OP',3),
('Mountain View Road', '82', 'GL8 8OP',3),
('Mountain View Road', '83', 'GL8 8OP',3),
('Mountain View Road', '85', 'GL8 8OP',3),
('Mountain View Road', '86', 'GL8 8OP',3),
('Mountain View Road', '88', 'GL8 8OP',3),
('Sunset Avenue', '90', 'GL9 9QR',3),
('Sunset Avenue', '92', 'GL9 9QR',3),
('Sunset Avenue', '94', 'GL9 9QR',3),
('Sunset Avenue', '95', 'GL9 9QR',3),
('Sunset Avenue', '97', 'GL9 9QR',3),
('Sunset Avenue', '98', 'GL9 9QR',3),
('Sunset Avenue', '100', 'GL9 9QR',3),
('Sunset Avenue', '101', 'GL9 9QR',3),
('Sunset Avenue', '103', 'GL9 9QR', 4),
('Sunset Avenue', '104', 'GL9 9QR', 4),
('Sunset Avenue', '106', 'GL9 9QR', 4),
('Sunset Avenue', '108', 'GL9 9QR', 4),
('Meadow Lane', '110', 'GL10 10ST', 4),
('Meadow Lane', '112', 'GL10 10ST', 4),
('Meadow Lane', '114', 'GL10 10ST', 4),
('Meadow Lane', '116', 'GL10 10ST', 4),
('Meadow Lane', '118', 'GL10 10ST', 4),
('Meadow Lane', '120', 'GL10 10ST', 4),
('Meadow Lane', '122', 'GL10 10ST', 4),
('Meadow Lane', '124', 'GL10 10ST', 4),
('Meadow Lane', '126', 'GL10 10ST', 4),
('Meadow Lane', '128', 'GL10 10ST', 4),
('Greenwood Drive', '130', 'GL11 11UV', 4),
('Greenwood Drive', '132', 'GL11 11UV', 4),
('Greenwood Drive', '134', 'GL11 11UV', 4),
('Greenwood Drive', '136', 'GL11 11UV', 4),
('Greenwood Drive', '138', 'GL11 11UV', 4),
('Greenwood Drive', '140', 'GL11 11UV', 4),
('Greenwood Drive', '142', 'GL11 11UV', 4),
('Greenwood Drive', '144', 'GL11 11UV', 4),
('Greenwood Drive', '146', 'GL11 11UV', 4),
('Greenwood Drive', '148', 'GL11 11UV', 4),
('Greenwood Drive', '150', 'GL11 11UV', 4),
('Greenwood Drive', '152', 'GL11 11UV', 4),
('Maple Court', '160', 'GL12 12WX', 5),
('Maple Court', '162', 'GL12 12WX', 5),
('Maple Court', '164', 'GL12 12WX', 5),
('Maple Court', '166', 'GL12 12WX', 5),
('Maple Court', '168', 'GL12 12WX', 5),
('Maple Court', '170', 'GL12 12WX', 5),
('Maple Court', '172', 'GL12 12WX', 5),
('Maple Court', '174', 'GL12 12WX', 5),
('Maple Court', '176', 'GL12 12WX', 5),
('Maple Court', '178', 'GL12 12WX', 5),
('Maple Court', '180', 'GL12 12WX', 6),
('Maple Court', '182', 'GL12 12WX', 6),
('Maple Court', '184', 'GL12 12WX', 6),
('Maple Court', '186', 'GL12 12WX', 6),
('Maple Court', '188', 'GL12 12WX', 6),
('Maple Court', '190', 'GL12 12WX', 6),
('Maple Court', '192', 'GL12 12WX', 6),
('Maple Court', '194', 'GL12 12WX', 6),
('Maple Court', '196', 'GL12 12WX', 6),
('Maple Court', '198', 'GL12 12WX', 6),
('Maple Court', '200', 'GL12 12WX', 6),
('Maple Court', '202', 'GL12 12WX', 7),
('Willow Lane', '204', 'GL13 13YZ', 7),
('Willow Lane', '206', 'GL13 13YZ', 7),
('Willow Lane', '208', 'GL13 13YZ', 7),
('Willow Lane', '210', 'GL13 13YZ', 7),
('Willow Lane', '212', 'GL13 13YZ', 7),
('Willow Lane', '214', 'GL13 13YZ', 7),
('Willow Lane', '216', 'GL13 13YZ', 7),
('Willow Lane', '218', 'GL13 13YZ', 7),
('Willow Lane', '220', 'GL13 13YZ', 7),
('Willow Lane', '222', 'GL13 13YZ', 7),
('Willow Lane', '224', 'GL13 13YZ', 8),
('Willow Lane', '226', 'GL13 13YZ', 8),
('Willow Lane', '228', 'GL13 13YZ', 8),
('Willow Lane', '230', 'GL13 13YZ', 8),
('Willow Lane', '232', 'GL13 13YZ', 8),
('Willow Lane', '234', 'GL13 13YZ', 8),
('Willow Lane', '236', 'GL13 13YZ', 8),
('Willow Lane', '238', 'GL13 13YZ', 8),
('Willow Lane', '240', 'GL13 13YZ', 8),
('Willow Lane', '242', 'GL13 13YZ', 8),
('Willow Lane', '244', 'GL13 13YZ', 9),
('Willow Lane', '246', 'GL13 13YZ', 9),
('Willow Lane', '248', 'GL13 13YZ', 9),
('Willow Lane', '250', 'GL13 13YZ', 9),
('Willow Lane', '252', 'GL13 13YZ', 9),
('Willow Lane', '254', 'GL13 13YZ', 9),
('Willow Lane', '256', 'GL13 13YZ', 9),
('Willow Lane', '258', 'GL13 13YZ', 9),
('Willow Lane', '260', 'GL13 13YZ', 9),
('Willow Lane', '262', 'GL13 13YZ', 10),
('Willow Lane', '264', 'GL13 13YZ', 10),
('Willow Lane', '266', 'GL13 13YZ', 10),
('Willow Lane', '268', 'GL13 13YZ', 10),
('Willow Lane', '270', 'GL13 13YZ', 10),
('Willow Lane', '272', 'GL13 13YZ', 10),
('Willow Lane', '274', 'GL13 13YZ', 10),
('Willow Lane', '276', 'GL13 13YZ', 10),
('Willow Lane', '278', 'GL13 13YZ', 10);

INSERT INTO user_account (username, password, isAdmin, points, address_id) VALUES
('laisjm', 'lais', true, 0, 2), ('lais', 'lais', true, 0, 3);

INSERT INTO collect_days (bin_type_id, weekday_id, zone_id) VALUES
(1, 3, 4), (2, 3, 4), (2, 3, 2);

INSERT INTO appointments (user_id, object_name, weekday_id, weight_kg) VALUES
(1, 'sofa', 2, 60);


