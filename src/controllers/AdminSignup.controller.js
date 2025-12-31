import bcrypt from "bcrypt";
import Admin from "../models/Admin.model.js";
import jwt from "jsonwebtoken";

const AdminSignup = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    if (!name || !email || !password) {
      return res.status(401).json({
        message: "All fields are required",
      });
    }

    const existingAdmin = await Admin.findOne({ email });

    if (existingAdmin) {
      return res.status(409).json({
        message: "Admin with this email already exists",
        success: false,
      });
    }

    const hashedPass = await bcrypt.hash(password, 10);

    const admin = await Admin.create({
      name,
      email,
      password: hashedPass,
    });

    const token = jwt.sign(
      {
        _id: admin._id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    res.cookie("token", token, {
      httpOnly: true, // prevents JS access
      secure: true, // required for HTTPS in production
      sameSite: "None", // required for cross-origin
    });

    return res.status(201).json({
      success: true,
      message: "Admin created successfully",
      token,
      id: admin._id,
      name: admin.name,
      email: admin.email,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Internal server error",
      success: false,
      error: err.message,
    });
  }
};

export default AdminSignup;
