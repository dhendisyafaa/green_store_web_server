-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "dailyReportId" INTEGER;

-- CreateTable
CREATE TABLE "dailyReport" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "income" INTEGER NOT NULL,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "dailyReport_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "dailyReport_title_key" ON "dailyReport"("title");

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_dailyReportId_fkey" FOREIGN KEY ("dailyReportId") REFERENCES "dailyReport"("id") ON DELETE SET NULL ON UPDATE CASCADE;
