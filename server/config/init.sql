CREATE TABLE IF NOT EXISTS cart
(
    id SERIAL NOT NULL,
    user_id INT UNIQUE NOT NULL,
    PRIMARY KEY (id)
);


CREATE TABLE IF NOT EXISTS cart_item
(
    id SERIAL NOT NULL,
    cart_id INT NOT NULL,
    product_id INT NOT NULL,
    quantity INT NOT NULL CHECK (quantity > 0),
    PRIMARY KEY (id),
    UNIQUE (cart_id, product_id)
);


CREATE TABLE IF NOT EXISTS order_item
(
    id SERIAL NOT NULL,
    order_id INT NOT NULL,
    product_id INT NOT NULL,
    quantity INT NOT NULL,
    PRIMARY KEY (id)
);


DROP TYPE IF EXISTS "payment";
CREATE TYPE "payment" AS ENUM (
  'PAYSTACK',
  'STRIPE'
);


CREATE TABLE IF NOT EXISTS orders
(
    order_id SERIAL NOT NULL,
    user_id INT NOT NULL,
    status VARCHAR(20) NOT NULL,
    date TIMESTAMP without time zone DEFAULT CURRENT_DATE NOT NULL,
    amount real,
    total INT,
    ref VARCHAR(100),
    payment_method payment,
    PRIMARY KEY (order_id)
);


CREATE TABLE IF NOT EXISTS products
(
    product_id SERIAL NOT NULL,
    name VARCHAR(50) NOT NULL,
    price INT NOT NULL,
    description TEXT NOT NULL,
    PRIMARY KEY (product_id)
);


CREATE TABLE IF NOT EXISTS product_images
(
    id SERIAL PRIMARY KEY,
    product_id INT NOT NULL,
	is_main BOOLEAN DEFAULT false NOT NULL,
    url VARCHAR(100) NOT NULL
);


CREATE TABLE IF NOT EXISTS reset_tokens
(
    id SERIAL NOT NULL,
    email VARCHAR NOT NULL,
    token VARCHAR NOT NULL,
    used BOOLEAN DEFAULT false NOT NULL,
    expiration TIMESTAMP without time zone,
    PRIMARY KEY (id)
);


CREATE TABLE IF NOT EXISTS reviews
(
    user_id INT NOT NULL,
    content TEXT NOT NULL,
    rating INT NOT NULL,
    product_id INT NOT NULL,
    date DATE NOT NULL,
    id INT NOT NULL,
    PRIMARY KEY (user_id, product_id)
);


CREATE TABLE IF NOT EXISTS users
(
    user_id SERIAL NOT NULL,
    password VARCHAR(200),
    email VARCHAR(100) UNIQUE NOT NULL,
    fullname VARCHAR(100) NOT NULL,
    username VARCHAR(50) UNIQUE NOT NULL,
    google_id VARCHAR(100) UNIQUE,
    roles VARCHAR(10)[] DEFAULT '{customer}'::VARCHAR[] NOT NULL,
    address VARCHAR(200),
    city VARCHAR(100),
    state VARCHAR(100),
    country VARCHAR(100),
    created_at TIMESTAMP without time zone DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (user_id)
);


ALTER TABLE cart
    ADD FOREIGN KEY (user_id)
    REFERENCES users (user_id)
    ON DELETE SET NULL
    NOT VALID;


ALTER TABLE cart_item
    ADD FOREIGN KEY (cart_id)
    REFERENCES cart (id)
    ON DELETE CASCADE
    NOT VALID;


ALTER TABLE cart_item
    ADD FOREIGN KEY (product_id)
    REFERENCES products (product_id)
    ON DELETE SET NULL
    NOT VALID;


ALTER TABLE order_item
    ADD FOREIGN KEY (order_id)
    REFERENCES orders (order_id)
    ON DELETE CASCADE
    NOT VALID;


ALTER TABLE order_item
    ADD FOREIGN KEY (product_id)
    REFERENCES products (product_id)
    ON DELETE SET NULL
    NOT VALID;


ALTER TABLE orders
    ADD FOREIGN KEY (user_id)
    REFERENCES users (user_id)
    ON DELETE CASCADE
    NOT VALID;


ALTER TABLE reviews
    ADD FOREIGN KEY (product_id)
    REFERENCES products (product_id)
    ON DELETE SET NULL
    NOT VALID;


ALTER TABLE reviews
    ADD FOREIGN KEY (user_id)
    REFERENCES users (user_id)
    ON DELETE SET NULL
    NOT VALID;


ALTER TABLE product_images
    ADD FOREIGN KEY (product_id)
    REFERENCES products (product_id)
    ON DELETE SET NULL
    NOT VALID;


CREATE UNIQUE INDEX IF NOT EXISTS users_unique_lower_email_idx
    ON users (lower(email));


CREATE UNIQUE INDEX IF NOT EXISTS users_unique_lower_username_idx
    ON users (lower(username));
