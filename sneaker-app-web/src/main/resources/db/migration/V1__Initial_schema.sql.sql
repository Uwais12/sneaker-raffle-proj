CREATE TABLE role (
                      id BIGSERIAL PRIMARY KEY,
                      name VARCHAR(255) NOT NULL
);

CREATE TABLE users (
                       id BIGSERIAL PRIMARY KEY,
                       email VARCHAR(255) UNIQUE NOT NULL,
                       password VARCHAR(255) NOT NULL,
                       created_at TIMESTAMP WITHOUT TIME ZONE NOT NULL,
                       updated_at TIMESTAMP WITHOUT TIME ZONE NOT NULL
);

CREATE TABLE user_role (
                           user_id BIGINT NOT NULL,
                           role_id BIGINT NOT NULL,
                           PRIMARY KEY(user_id, role_id),
                           FOREIGN KEY(user_id) REFERENCES users(id),
                           FOREIGN KEY(role_id) REFERENCES role(id)
);

CREATE TABLE sneaker (
                         id BIGSERIAL PRIMARY KEY,
                         name VARCHAR(255) NOT NULL,
                         brand VARCHAR(255) NOT NULL,
                         release_date DATE NOT NULL,
                         image_url VARCHAR(255) NOT NULL,
                         price NUMERIC(19, 2) NOT NULL,
                         product_code VARCHAR(255) NOT NULL,
                         thumbs_up_count INTEGER NOT NULL,
                         thumbs_down_count INTEGER NOT NULL,
                         colourway VARCHAR(255) NOT NULL
);

CREATE TABLE raffle (
                        id BIGSERIAL PRIMARY KEY,
                        sneaker_id BIGINT,
                        shop_name VARCHAR(255) NOT NULL,
                        region VARCHAR(255) NOT NULL,
                        entry_method VARCHAR(255) NOT NULL,
                        start_date TIMESTAMP WITHOUT TIME ZONE NOT NULL,
                        end_date TIMESTAMP WITHOUT TIME ZONE NOT NULL,
                        is_shipped BOOLEAN NOT NULL,
                        url VARCHAR(255) NOT NULL,
                        FOREIGN KEY(sneaker_id) REFERENCES sneaker(id)
);

CREATE TABLE user_entries (
                              user_id BIGINT NOT NULL,
                              raffle_id BIGINT NOT NULL,
                              PRIMARY KEY(user_id, raffle_id),
                              FOREIGN KEY(user_id) REFERENCES users(id),
                              FOREIGN KEY(raffle_id) REFERENCES raffle(id)
);
