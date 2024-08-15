require("dotenv").config();
const ImageKit = require("imagekit");

const { IMAGEKITIO_URL, IMAGEKITIO_PUBLIC_KEY, IMAGEKITIO_PRIVATE_KEY } =
  process.env;

module.exports = new ImageKit({
  urlEndpoint: IMAGEKITIO_URL,
  publicKey: IMAGEKITIO_PUBLIC_KEY,
  privateKey: IMAGEKITIO_PRIVATE_KEY,
});
