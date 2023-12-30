import prisma from "../db/index.js";

export const findAllDailyReport = async () => {
  const dailyReport = await prisma.dailyReport.findMany();

  return dailyReport;
};

export const insertDailyReport = async (projectData) => {
  console.log(
    "🚀 ~ file: daily_report.repository.js:10 ~ insertDailyReport ~ projectData:",
    projectData
  );
  // const project = await prisma.dailyReport.create({
  //   data: {
  //     title: projectData.title,
  //     income: projectData.title,
  //     notes: projectData.notes,
  //   },
  // });

  // return project;
};
