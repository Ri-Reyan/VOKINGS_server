import Service from "../models/Services.model.js";

const RequestedService = async (req, res) => {
  const { serviceId } = req.body;

  try {
    if (!serviceId) {
      return res.status(400).json({
        message: "Service id required",
      });
    }

    const service = await Service.findById(serviceId);

    if (!service) {
      return res.status(400).json({
        message: "Service not found",
      });
    }

    return res.status(200).json({
      message: "Service found",
      service,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

export default RequestedService;
