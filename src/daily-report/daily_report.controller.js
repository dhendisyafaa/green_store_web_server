import express from "express";
import {
  createDailyReport,
  getAllDailyReport,
} from "./daily_report.service.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const dailyReport = await getAllDailyReport();
    res.send(dailyReport);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.post("/", async (req, res) => {
  try {
    const newDailyReportData = req.body;

    const dailyReport = await createDailyReport(newDailyReportData);

    res.send({
      data: dailyReport,
      message: "create daily report success",
    });
  } catch (error) {
    res.status(400).send(error.message);
  }
});

export default router;
