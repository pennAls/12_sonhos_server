"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleGet = void 0;
const dashboardService_1 = require("../services/dashboardService");
const handleGet = async (req, res) => {
    const donors = await (0, dashboardService_1.getAllDonors)();
    res.json(donors);
};
exports.handleGet = handleGet;
