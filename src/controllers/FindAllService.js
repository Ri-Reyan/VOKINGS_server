import Service from "../models/Services.model.js";

const FindAllService = async (req, res) => {
  try {
    const services = await Service.find();

    return res.status(200).json({
      services,
      message: "Services fetched sucessfully",
      success: true,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

export default FindAllService;
