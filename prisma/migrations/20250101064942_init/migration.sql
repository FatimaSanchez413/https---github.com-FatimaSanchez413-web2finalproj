/*
  Warnings:

  - You are about to drop the column `expense` on the `MonthHistory` table. All the data in the column will be lost.
  - You are about to drop the column `income` on the `MonthHistory` table. All the data in the column will be lost.
  - You are about to drop the column `expense` on the `YearHistory` table. All the data in the column will be lost.
  - You are about to drop the column `income` on the `YearHistory` table. All the data in the column will be lost.
  - Added the required column `Earnings` to the `MonthHistory` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Expense` to the `MonthHistory` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Earnings` to the `YearHistory` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Expense` to the `YearHistory` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Category" (
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "icon" TEXT NOT NULL,
    "type" TEXT NOT NULL DEFAULT 'Earnings'
);
INSERT INTO "new_Category" ("createdAt", "icon", "name", "type", "userId") SELECT "createdAt", "icon", "name", "type", "userId" FROM "Category";
DROP TABLE "Category";
ALTER TABLE "new_Category" RENAME TO "Category";
CREATE UNIQUE INDEX "Category_name_userId_type_key" ON "Category"("name", "userId", "type");
CREATE TABLE "new_MonthHistory" (
    "userId" TEXT NOT NULL,
    "day" INTEGER NOT NULL,
    "month" INTEGER NOT NULL,
    "year" INTEGER NOT NULL,
    "Earnings" REAL NOT NULL,
    "Expense" REAL NOT NULL,

    PRIMARY KEY ("day", "month", "year", "userId")
);
INSERT INTO "new_MonthHistory" ("day", "month", "userId", "year") SELECT "day", "month", "userId", "year" FROM "MonthHistory";
DROP TABLE "MonthHistory";
ALTER TABLE "new_MonthHistory" RENAME TO "MonthHistory";
CREATE TABLE "new_Transaction" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "amount" REAL NOT NULL,
    "description" TEXT NOT NULL,
    "date" DATETIME NOT NULL,
    "userId" TEXT NOT NULL,
    "type" TEXT NOT NULL DEFAULT 'Earnings',
    "category" TEXT NOT NULL,
    "categoryIcon" TEXT NOT NULL
);
INSERT INTO "new_Transaction" ("amount", "category", "categoryIcon", "createdAt", "date", "description", "id", "type", "updateAt", "userId") SELECT "amount", "category", "categoryIcon", "createdAt", "date", "description", "id", "type", "updateAt", "userId" FROM "Transaction";
DROP TABLE "Transaction";
ALTER TABLE "new_Transaction" RENAME TO "Transaction";
CREATE TABLE "new_YearHistory" (
    "userId" TEXT NOT NULL,
    "month" INTEGER NOT NULL,
    "year" INTEGER NOT NULL,
    "Earnings" REAL NOT NULL,
    "Expense" REAL NOT NULL,

    PRIMARY KEY ("month", "year", "userId")
);
INSERT INTO "new_YearHistory" ("month", "userId", "year") SELECT "month", "userId", "year" FROM "YearHistory";
DROP TABLE "YearHistory";
ALTER TABLE "new_YearHistory" RENAME TO "YearHistory";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
