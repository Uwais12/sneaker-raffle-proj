INSERT INTO role (name) VALUES ('ROLE_USER'), ('ROLE_ADMIN');


INSERT INTO sneaker (name, brand, release_date, image_url, price, product_code, thumbs_up_count, thumbs_down_count, colourway)
VALUES ('Sneaker 1', 'Brand 1', '2023-05-21', 'https://source.unsplash.com/random/200x200?hypebeast-sneakers', 120.50, 'Code1', 100, 10, 'Red'),
       ('Sneaker 2', 'Brand 2', '2023-06-21', 'https://source.unsplash.com/random/200x200?hypebeast-sneakers', 150.00, 'Code2', 200, 20, 'Blue'),
       ('Sneaker 3', 'Brand 3', '2023-07-21', 'https://source.unsplash.com/random/200x200?hypebeast-sneakers', 170.50, 'Code3', 300, 30, 'Green'),
       ('Sneaker 4', 'Brand 4', '2023-08-21', 'https://source.unsplash.com/random/200x200?hypebeast-sneakers', 200.00, 'Code4', 400, 40, 'Yellow'),
       ('Sneaker 5', 'Brand 5', '2023-09-21', 'https://source.unsplash.com/random/200x200?hypebeast-sneakers', 220.50, 'Code5', 500, 50, 'Black');

INSERT INTO raffle (sneaker_id, shop_name, region, entry_method, start_date, end_date, is_shipped, url)
VALUES
    (1, 'Shop A', 'North America', 'Online', '2023-06-01 00:00:00', '2023-06-05 00:00:00', true, 'https://en.afew-store.com/products/air-jordan-4-retro-black-white-tour-yellow'),
    (1, 'Shop B', 'Europe', 'In-store', '2023-06-02 00:00:00', '2023-06-06 00:00:00', false, 'https://en.afew-store.com/products/air-jordan-4-retro-black-white-tour-yellow'),
    (1, 'Shop C', 'Asia', 'Online', '2023-06-03 00:00:00', '2023-06-07 00:00:00', true, 'https://en.afew-store.com/products/air-jordan-4-retro-black-white-tour-yellow'),
    (1, 'Shop D', 'South America', 'In-store', '2023-06-04 00:00:00', '2023-06-08 00:00:00', false, 'https://en.afew-store.com/products/air-jordan-4-retro-black-white-tour-yellow'),
    (1, 'Shop E', 'Africa', 'Online', '2023-06-05 00:00:00', '2023-06-09 00:00:00', true, 'https://en.afew-store.com/products/air-jordan-4-retro-black-white-tour-yellow'),
    (2, 'Shop F', 'North America', 'In-store', '2023-07-01 00:00:00', '2023-07-05 00:00:00', false, 'https://en.afew-store.com/products/air-jordan-4-retro-black-white-tour-yellow'),
    (2, 'Shop G', 'Europe', 'Online', '2023-07-02 00:00:00', '2023-07-06 00:00:00', true, 'https://en.afew-store.com/products/air-jordan-4-retro-black-white-tour-yellow'),
    (2, 'Shop H', 'Asia', 'In-store', '2023-07-03 00:00:00', '2023-07-07 00:00:00', false, 'https://en.afew-store.com/products/air-jordan-4-retro-black-white-tour-yellow'),
    (2, 'Shop I', 'South America', 'Online', '2023-07-04 00:00:00', '2023-07-08 00:00:00', true, 'https://en.afew-store.com/products/air-jordan-4-retro-black-white-tour-yellow'),
    (2, 'Shop J', 'Africa', 'In-store', '2023-07-05 00:00:00', '2023-07-09 00:00:00', false, 'https://en.afew-store.com/products/air-jordan-4-retro-black-white-tour-yellow'),
    (3, 'Shop K', 'North America', 'Online', '2023-08-01 00:00:00', '2023-08-05 00:00:00', true, 'https://en.afew-store.com/products/air-jordan-4-retro-black-white-tour-yellow'),
    (3, 'Shop L', 'Europe', 'In-store', '2023-08-02 00:00:00', '2023-08-06 00:00:00', false, 'https://en.afew-store.com/products/air-jordan-4-retro-black-white-tour-yellow'),
    (3, 'Shop M', 'Asia', 'Online', '2023-08-03 00:00:00', '2023-08-07 00:00:00', true, 'https://en.afew-store.com/products/air-jordan-4-retro-black-white-tour-yellow'),
    (3, 'Shop N', 'South America', 'In-store', '2023-08-04 00:00:00', '2023-08-08 00:00:00', false, 'https://en.afew-store.com/products/air-jordan-4-retro-black-white-tour-yellow'),
    (3, 'Shop O', 'Africa', 'Online', '2023-08-05 00:00:00', '2023-08-09 00:00:00', true, 'https://en.afew-store.com/products/air-jordan-4-retro-black-white-tour-yellow'),
    (4, 'Shop P', 'North America', 'In-store', '2023-09-01 00:00:00', '2023-09-05 00:00:00', false, 'https://en.afew-store.com/products/air-jordan-4-retro-black-white-tour-yellow'),
    (4, 'Shop Q', 'Europe', 'Online', '2023-09-02 00:00:00', '2023-09-06 00:00:00', true, 'https://en.afew-store.com/products/air-jordan-4-retro-black-white-tour-yellow'),
    (4, 'Shop R', 'Asia', 'In-store', '2023-09-03 00:00:00', '2023-09-07 00:00:00', false, 'https://en.afew-store.com/products/air-jordan-4-retro-black-white-tour-yellow'),
    (4, 'Shop S', 'South America', 'Online', '2023-09-04 00:00:00', '2023-09-08 00:00:00', true, 'https://en.afew-store.com/products/air-jordan-4-retro-black-white-tour-yellow'),
    (4, 'Shop T', 'Africa', 'In-store', '2023-09-05 00:00:00', '2023-09-09 00:00:00', false, 'https://en.afew-store.com/products/air-jordan-4-retro-black-white-tour-yellow'),
    (5, 'Shop U', 'North America', 'Online', '2023-10-01 00:00:00', '2023-10-05 00:00:00', true, 'https://en.afew-store.com/products/air-jordan-4-retro-black-white-tour-yellow'),
    (5, 'Shop V', 'Europe', 'In-store', '2023-10-02 00:00:00', '2023-10-06 00:00:00', false, 'https://en.afew-store.com/products/air-jordan-4-retro-black-white-tour-yellow'),
    (5, 'Shop W', 'Asia', 'Online', '2023-10-03 00:00:00', '2023-10-07 00:00:00', true, 'https://en.afew-store.com/products/air-jordan-4-retro-black-white-tour-yellow'),
    (5, 'Shop X', 'South America', 'In-store', '2023-10-04 00:00:00', '2023-10-08 00:00:00', false, 'https://en.afew-store.com/products/air-jordan-4-retro-black-white-tour-yellow'),
    (5, 'Shop Y', 'Africa', 'Online', '2023-10-05 00:00:00', '2023-10-09 00:00:00', true, 'https://en.afew-store.com/products/air-jordan-4-retro-black-white-tour-yellow');
