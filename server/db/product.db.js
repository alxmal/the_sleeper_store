const pool = require("../config");

const getAllProductsDb = async ({ limit, offset }) => {
  const { rows } = await pool.query(
    `SELECT products.*, product_images.url AS cover
	FROM products
	LEFT JOIN product_images
	ON products.product_id = product_images.product_id WHERE is_main = TRUE
    GROUP BY products.product_id, product_images.url limit $1 offset $2 `,
    [limit, offset]
  );
  const products = [...rows].sort(function (a, b) {
    return a - b;
  });
  return products;
};

const createProductDb = async ({ name, price, description, cover, images }) => {
  console.log("INSERT DATA - ", name, price, description, cover, images);

  const client = await pool.connect();

  try {
    await client.query("BEGIN");
    const { rows: product } = await client.query(
      "INSERT INTO products(name, price, description) VALUES($1, $2, $3) RETURNING * ",
      [name, price, description]
    );
    let productId = product[0].product_id;
    let urlQueryString =
      "INSERT INTO product_images(product_id, url, is_main) VALUES($1, $2, $3)";

    await client.query(urlQueryString, [productId, cover, true]);

    for (const url of images) {
      await client.query(urlQueryString, [productId, url, false]);
    }

    await client.query("COMMIT");
    return product[0];
  } catch (e) {
    await client.query("ROLLBACK");
    throw e;
  } finally {
    client.release();
  }
};

const getProductDb = async ({ id }) => {
  console.log("PRODUCT ID - ", id);
  const { rows: product } = await pool.query(
    `SELECT products.*, ARRAY_AGG(product_images.url) AS images
	FROM products
	LEFT JOIN product_images
	ON products.product_id = product_images.product_id WHERE product_images.product_id = $1
    GROUP BY products.product_id `,
    [id]
  );
  return product[0];
};

const getProductByNameDb = async ({ name }) => {
  console.log(name);
  const { rows: product } = await pool.query(
    `SELECT products.*, TRUNC(AVG(reviews.rating),1) as avg_rating, COUNT(reviews.*) from products
        LEFT JOIN reviews
        ON products.product_id = reviews.product_id
        WHERE products.name = $1
        GROUP BY products.product_id`,
    [name]
  );
  return product[0];
};

const updateProductDb = async ({ name, price, description, image_url, id }) => {
  console.log(name, image_url, id);
  const { rows: product } = await pool.query(
    "UPDATE products SET name = $1, price = $2, description = $3, image_url = $4 WHERE product_id = $5 RETURNING * ",
    [name, price, description, image_url, id]
  );
  console.log("PRODUCT - ", product[0]);
  return product[0];
};

const deleteProductDb = async ({ id }) => {
  const { rows } = await pool.query(
    "DELETE FROM products where product_id = $1 RETURNING *",
    [id]
  );
  return rows[0];
};

module.exports = {
  getProductDb,
  getProductByNameDb,
  createProductDb,
  updateProductDb,
  deleteProductDb,
  getAllProductsDb,
};
