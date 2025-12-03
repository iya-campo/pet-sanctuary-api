/*
  Warnings:

  - Made the column `imageUrls` on table `Pet` required. This step will fail if there are existing NULL values in that column.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Pet" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "type" TEXT NOT NULL,
    "name" TEXT NOT NULL DEFAULT '',
    "desc" TEXT NOT NULL DEFAULT '',
    "gender" TEXT NOT NULL,
    "species" TEXT NOT NULL,
    "breed" TEXT NOT NULL DEFAULT '',
    "coat" TEXT NOT NULL DEFAULT '',
    "age" INTEGER,
    "location" TEXT,
    "imageUrls" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "adopterId" INTEGER,
    CONSTRAINT "Pet_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Pet_adopterId_fkey" FOREIGN KEY ("adopterId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Pet" ("adopterId", "age", "breed", "coat", "createdAt", "desc", "gender", "id", "imageUrls", "location", "name", "species", "type", "userId") SELECT "adopterId", "age", "breed", "coat", "createdAt", "desc", "gender", "id", "imageUrls", "location", "name", "species", "type", "userId" FROM "Pet";
DROP TABLE "Pet";
ALTER TABLE "new_Pet" RENAME TO "Pet";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
