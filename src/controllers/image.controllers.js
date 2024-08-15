const ImageService = require("../services/image.service");

class ImageController {
  async upload(req, res) {
    try {
      const result = await ImageService.upload(req);

      res.status(201).json({
        status: true,
        message: "success",
        data: result,
      });
    } catch (error) {
      res.status(500).json({
        status: false,
        message: "fail",
        error: error.message,
      });
    }
  }
  async getAll(req, res) {
    try {
      const results = await ImageService.getAll();

      res.status(200).json({
        status: true,
        message: "success",
        data: results,
      });
    } catch (error) {
      res.status(500).json({
        status: false,
        message: "fail",
        error: error.message,
      });
    }
  }

  async getById(req, res) {
    try {
      const id = req.params.id;
      const result = await ImageService.getById(id);

      if (!result) {
        return res.status(404).json({
          status: false,
          message: "fail",
          error: "Image not found",
        });
      }

      res.status(200).json({
        status: true,
        message: "success",
        data: result,
      });
    } catch (error) {
      res.status(500).json({
        status: false,
        message: "fail",
        error: error.message,
      });
    }
  }

  async update(req, res) {
    try {
      const result = await ImageService.updateById(req);

      res.status(200).json({
        status: true,
        message: "success",
        data: result,
      });
    } catch (error) {
      res.status(500).json({
        status: false,
        message: "fail",
        error: error.message,
      });
    }
  }

  async delete(req, res) {
    try {
      const result = await ImageService.deleteById(req);
      res.status(200).json({
        status: true,
        message: "success",
        data: result,
      });
    } catch (error) {
      res.status(500).json({
        status: false,
        message: "fail",
        error: error.message,
      });
    }
  }
}

module.exports = new ImageController();
