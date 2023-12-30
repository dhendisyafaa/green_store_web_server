import {
  findAllDailyReport,
  insertDailyReport,
} from "./daily_report.repository.js";

export const getAllDailyReport = async (req, res) => {
  const dailyReport = await findAllDailyReport();

  return dailyReport;
};

export const createDailyReport = async (newDailyReportData) => {
  const dailyReport = await insertDailyReport(newDailyReportData);

  return dailyReport;
};
