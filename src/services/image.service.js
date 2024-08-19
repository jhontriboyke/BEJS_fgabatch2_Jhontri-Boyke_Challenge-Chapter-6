const imagekit = require("../libs/imagekit");
const fs = require("fs/promises");
const prisma = require("../libs/prisma");

class ImageService {
  async upload(req) {
    if (!req.file) {
      throw new Error("No file uploaded");
    }

    try {
      const { title, description } = req.body;

      // const data = await fs.readFile(req.file.path);

      // Check if title already exist
      const isTitleExist = await prisma.image.findUnique({
        where: {
          title: title,
        },
      });

      if (isTitleExist) {
        throw new Error("Title already exist");
      }

      // Upload image
      const uploadFile = await imagekit.upload({
        fileName: req.file.originalname,
        file: req.file.buffer,
        folder: "/Memes",
      });

      // Add to database
      const image = await prisma.image.create({
        data: {
          url: uploadFile.url,
          title: title,
          description: description,
        },
      });

      // Delete from server storage
      // await fs.unlink(req.file.path);

      return image;
    } catch (error) {
      throw error;
    }
  }

  async getAll() {
    try {
      return await prisma.image.findMany();
    } catch (error) {
      throw error;
    }
  }

  async getById(id) {
    return await prisma.image.findUnique({
      where: {
        id: id,
        is_deleted: false,
      },
    });
  }

  async updateById(req) {
    try {
      const { title, description } = req.body;
      const id = req.params.id;

      return await prisma.image.update({
        where: {
          id: id,
        },
        data: {
          title,
          description,
        },
      });
    } catch (error) {
      throw error;
    }
  }

  async deleteById(req) {
    try {
      const id = req.params.id;

      // Check if image exist on db
      const image = await this.getById(id);
      if (!image) {
        throw new Error("Image not found");
      }

      // Delete cache
      const image_url = image.url;
      const purged = await imagekit.purgeCache(image_url);

      // Find imagekit.io file by url
      const files = await imagekit.listFiles({
        url: image.url,
      });

      if (files.length === 0) {
        throw new Error("Image url not found");
      }

      await imagekit.deleteFile(files[0].fileId);

      return await prisma.image.delete({
        where: {
          id: id,
        },
      });
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new ImageService();
