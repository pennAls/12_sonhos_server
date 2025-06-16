import express from "express";
import cors from "cors";
import registerRoute from "./routes/registerRoute";
import loginRoute from "./routes/loginRoute";
import dashboardRoute from "./routes/dashboardRoute";
import authMiddleware from "./middleware/authMiddleware";
import doacoesRoute from "./routes/doacoesRoute";
import donorsRoute from "./routes/donorsRoute";
const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(
  cors({
    origin: "https://12-sonhos.vercel.app",
  })
);
app.use("/auth", registerRoute);
app.use("/auth", loginRoute);
app.use("/dashboard", authMiddleware, dashboardRoute);
app.use("/dashboard", authMiddleware, doacoesRoute);
app.use("/donor", authMiddleware, donorsRoute);

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
