import Service from "../models/Services.model.js";
import Cloudinary from "../../services/Cloudinary.js";

const CreateService = async (req, res) => {
  const { servicename, providername, status } = req.body;
  try {
    if (!servicename || !providername || !status) {
      return res.status(400).json({
        message: "All fields are required",
        success: false,
      });
    }

    if (!req.file) {
      return res.status(400).json({
        message: "Image required",
        success: false,
      });
    }

    const uploaded = await Cloudinary.uploader.upload(req.file.path, {
      folder: "provider",
    });

    const createdService = await Service.create({
      servicename,
      providername,
      image: uploaded.secure_url,
      status,
    });

    if (!createdService) {
      return res.status(400).json({
        message: "Service creation failed",
        success: false,
      });
    }

    return res.status(201).json({
      success: true,
      service: createdService,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Internal server error",
      success: false,
      error: err.message,
    });
  }
};

export default CreateService;
