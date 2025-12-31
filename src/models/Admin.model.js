import mongoose from "mongoose";

const AdminSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minlength: [8, "password must be 8 charecters"],
    },
  },
  {
    timestamps: true,
  }
);

const Admin = mongoose.model("Admin", AdminSchema);
export default Admin;
