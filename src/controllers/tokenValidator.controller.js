import jwt from "jsonwebtoken";
import Admin from "../models/Admin.model.js";

const TokenValidator = async (req, res) => {
  const { token } = req.body;

  try {
    if (!token) {
      return res.status(401).json({
        message: "No token provided",
        success: false,
      });
    }

    // ১. টোকেন ভেরিফাই করে ডেটা বের করা (যেমন: admin id)
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // ২. ডাটাবেস থেকে ওই এডমিনের তথ্য নিয়ে আসা (নিরাপত্তার জন্য)
    const admin = await Admin.findById(decoded._id).select("-password"); // পাসওয়ার্ড বাদ দিয়ে

    if (!admin) {
      return res.status(404).json({
        message: "Admin not found",
        success: false,
      });
    }

    // ৩. সাকসেস রেসপন্সে এডমিনের ডেটা পাঠানো
    return res.status(200).json({
      message: "Token verified",
      success: true,
      admin: {
        email: admin.email,
        name: admin.name,
      },
    });
  } catch (err) {
    return res.status(401).json({
      message: "Invalid or expired token",
      success: false,
      error: err.message,
    });
  }
};

export default TokenValidator;
