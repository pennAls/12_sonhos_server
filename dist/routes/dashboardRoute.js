"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const dashboardControl_1 = require("../controls/dashboardControl");
const router = (0, express_1.Router)();
router.get("", dashboardControl_1.handleGet);
exports.default = router;
