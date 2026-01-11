/*
  Warnings:

  - Added the required column `code` to the `Category` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Category" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "description" TEXT,
    "iconName" TEXT NOT NULL,
    "colorHexCode" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Category" ("colorHexCode", "createdAt", "description", "iconName", "id", "title", "updatedAt") SELECT "colorHexCode", "createdAt", "description", "iconName", "id", "title", "updatedAt" FROM "Category";
DROP TABLE "Category";
ALTER TABLE "new_Category" RENAME TO "Category";
CREATE UNIQUE INDEX "Category_code_key" ON "Category"("code");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
