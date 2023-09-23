const router = require("express").Router();
const {
  getAllProducts,
  createProduct,
  getProduct,
  updateProduct,
  deleteProduct,
  getProductByName,
  getProductReviews,
  createProductReview,
  updateProductReview,
} = require("../controllers/products.controller");
const verifyAdmin = require("../middleware/verifyAdmin");
const verifyToken = require("../middleware/verifyToken");
const multer = require("multer");
const { nanoid } = require("nanoid");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/assets/images");
  },
  filename: (req, file, cb) => {
    let extArr = file.mimetype.split("/");
    let ext = extArr[extArr.length - 1];
    let uniqueSuffix = nanoid();
    cb(null, `${file.fieldname}-${uniqueSuffix}.${ext}`);
  },
});
const upload = multer({ storage: storage });

router
  .route("/")
  .get(getAllProducts)
  .post(
    verifyToken,
    verifyAdmin,
    upload.fields([
      { name: "cover", maxCount: 1 },
      { name: "images", maxCount: 10 },
    ]),
    createProduct
  );

router.route("/search").get(getProductByName);

router
  .route("/:id")
  .get(getProduct)
  .put(verifyToken, verifyAdmin, upload.array("image", 10), updateProduct)
  .delete(verifyToken, verifyAdmin, deleteProduct);

router
  .route("/:id/reviews")
  .get(getProductReviews)
  .post(verifyToken, createProductReview)
  .put(verifyToken, updateProductReview);

module.exports = router;
