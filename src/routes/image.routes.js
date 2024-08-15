const router = require("express").Router();
const ImageController = require("../controllers/image.controllers");
const { image } = require("../libs/multer");

/* POST: upload image */
router.post("/", image.single("image"), ImageController.upload);

/* GET: retrieve all images */
router.get("/", ImageController.getAll);

/* GET: retrieve image by id */
router.get("/:id", ImageController.getById);

/* PUT: update title, description of image by id */
router.put("/:id", ImageController.update);

/* DELETE: delete image data from database and external storage */
router.delete("/:id", ImageController.delete);

module.exports = router;
