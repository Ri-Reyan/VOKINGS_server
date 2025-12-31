import jwt from "jsonwebtoken";
import Admin from "../models/Admin.model.js";
import bcrypt from "bcrypt";

const AdminSignIn = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const admin = await Admin.findOne({ email });

    if (!admin) {
      return res.status(400).json({
        message: "User dosn't exits",
      });
    }

    const matchedPass = await bcrypt.compare(password, admin.password);

    if (!matchedPass) {
      return res.status(400).json({
        message: "Invalid email or password",
      });
    }

    const token = jwt.sign({ _id: admin._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.cookie("token", token, {
      httpOnly: true, // prevents JS access
      secure: true, // required for HTTPS in production
      sameSite: "None", // required for cross-origin
    });

    return res.status(200).json({
      message: "Login successfull",
      token,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Internal server error",
      error: err.message,
    });
  }
};

export default AdminSignIn;
