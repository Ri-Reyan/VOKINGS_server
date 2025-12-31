import express from "express";
import RequestedService from "../controllers/RequestedService.controller.js";

const router = express.Router();

router.post("/user/request", RequestedService);

export default router;
