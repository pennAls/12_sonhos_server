"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const loginControl_1 = require("../controls/loginControl");
const router = (0, express_1.Router)();
router.post("/login", loginControl_1.handlePost);
router.get("/login", loginControl_1.handleGet);
exports.default = router;
