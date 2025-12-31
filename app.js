import express from "express";
import cors from "cors";
import providersRouter from "./src/routes/providers.route.js";
import adminRouter from "./src/routes/admin.route.js";
import userRouter from "./src/routes/user.route.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "https://vokings-client.vercel.app",
    credentials: true,
  })
);

app.use("/api", providersRouter);
app.use("/api", adminRouter);
app.use("/api", userRouter);

export default app;
