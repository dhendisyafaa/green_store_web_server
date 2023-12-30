import express from "express";
import dotenv from "dotenv";
import productController from "./product/product.controller.js";
import dailyReportController from "./daily-report/daily_report.controller.js";
import upload from "./configs/multer.js";
import cors from "cors";

const app = express();
dotenv.config();

const PORT = process.env.PORT;

app.use(
  cors({
    credentials: true,
    origin: [
      "http://localhost:3000",
      "http://localhost:5173",
      " https://v9hj324k-5000.asse.devtunnels.ms/products",
    ],
  })
);
app.use(express.json());
app.use(upload.single("product_img"));

// routes
app.use("/products", productController);
app.use("/daily-report", dailyReportController);

app.listen(PORT, () => {
  console.log(`Server up and running at port: ${PORT}`);
});
