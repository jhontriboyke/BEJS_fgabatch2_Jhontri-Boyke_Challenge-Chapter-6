const multer = require("multer");
const path = require("path");

// const filename = (req, file, callback) => {
//   const fileName = Date.now() + "-" + file.originalname;
//   callback(null, fileName);
// };

// const generateStorage = (destination) => {
//   return multer.diskStorage({
//     destination: (req, file, callback) => {
//       callback(null, destination);
//     },
//     filename,
//   });
// };

module.exports = {
  image: multer({
    // storage: generateStorage("./public/images"),
    storage: multer.memoryStorage(),
    fileFilter: (req, file, callback) => {
      const allowedMimeTypes = ["image/png", "image/jpg", "image/jpeg"];

      if (allowedMimeTypes.includes(file.mimetype)) {
        callback(null, true);
      } else {
        const err = new Error(
          `Only ${allowedMimeTypes.join(", ")} allowed to upload`
        );
        callback(err, false);
      }
    },
    limits: {
      fileSize: 5 * 1024 * 1024, // 5mb
    },
    onError: (err, next) => {
      next(err);
    },
  }),
};
