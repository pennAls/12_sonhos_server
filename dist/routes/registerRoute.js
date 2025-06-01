"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const registerControl_1 = require("../controls/registerControl");
const router = (0, express_1.Router)();
router.post("/register", registerControl_1.handlePost);
router.get("/register", registerControl_1.handleGet);
exports.default = router;
