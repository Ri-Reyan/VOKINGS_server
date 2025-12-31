import express from "express";
import uploads from "../middleware/multer.js";
import CreateService from "../controllers/CreateService.contoller.js";

const router = express.Router();

router.post("/provider/createservice", uploads.single("image"), CreateService);

export default router;
