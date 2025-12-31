import AdminSignIn from "../controllers/AdminSignIn.controller.js";
import AdminSignup from "../controllers/AdminSignup.controller.js";
import { Router } from "express";
import TokenValidator from "../controllers/tokenValidator.controller.js";
import FindAllService from "../controllers/FindAllService.js";
import DeleteService from "../controllers/DeleteService.js";

const router = Router();

router.post("/admin/signup", AdminSignup);
router.post("/admin/signin", AdminSignIn);
router.post("/admin/tokenvalidator", TokenValidator);
router.get("/admin/findallservice", FindAllService);
router.post("/admin/delete", DeleteService);

export default router;
