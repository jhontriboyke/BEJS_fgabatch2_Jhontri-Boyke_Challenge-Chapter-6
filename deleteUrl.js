const imagekit = require("./src/libs/imagekit");

const urls = ["https://ik.imagekit.io/ceod1106/GSmNoxIXoAEwRF2_7n-VKz5nK.jpg"];

const init = async () => {
  for (const url of urls) {
    await imagekit.purgeCache(url);
  }
};

init();
