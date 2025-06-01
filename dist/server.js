"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const registerRoute_1 = __importDefault(require("./routes/registerRoute"));
const loginRoute_1 = __importDefault(require("./routes/loginRoute"));
const dashboardRoute_1 = __importDefault(require("./routes/dashboardRoute"));
const authMiddleware_1 = __importDefault(require("./middleware/authMiddleware"));
const doacoesRoute_1 = __importDefault(require("./routes/doacoesRoute"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 8483;
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    origin: "http://localhost:5173",
}));
app.use("/auth", registerRoute_1.default);
app.use("/auth", loginRoute_1.default);
app.use("/dashboard", authMiddleware_1.default, dashboardRoute_1.default);
app.use("/dashboard", authMiddleware_1.default, doacoesRoute_1.default);
app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`);
});
