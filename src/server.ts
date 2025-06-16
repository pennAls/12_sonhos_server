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

const allowedOrigins = [
  "https://12-sonhos.vercel.app",
  "http://localhost:5173",
];

const corsOptions = {
  origin: (
    origin: string | undefined,
    callback: (err: Error | null, allow?: boolean) => void
  ) => {
    // Permite requisições da sua lista E também requisições sem origem (como do Postman)
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Acesso não permitido pelo CORS"));
    }
  },
};

app.use(cors(corsOptions));

app.use("/auth", registerRoute);
app.use("/auth", loginRoute);
app.use("/dashboard", authMiddleware, dashboardRoute);
app.use("/dashboard", authMiddleware, doacoesRoute);
app.use("/donor", authMiddleware, donorsRoute);

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
