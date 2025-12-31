import Service from "../models/Services.model.js";

const DeleteService = async (req, res) => {
  const { _id } = req.body;

  try {
    if (!_id) {
      return res.status(400).json({
        success: false,
        message: "Service ID is required",
      });
    }

    const deletedService = await Service.findByIdAndDelete(_id);

    if (!deletedService) {
      return res.status(404).json({
        success: false,
        message: "Service not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Service deleted successfully",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: err.message,
    });
  }
};

export default DeleteService;
