import mongoose from "mongoose";

const ServicesSchema = mongoose.Schema(
  {
    servicename: {
      type: String,
      required: true,
    },
    providername: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    status: {
      type: Boolean,
      required: true,
    },
  },
  { timestamps: true }
);

const Service = mongoose.model("Service", ServicesSchema);

export default Service;
