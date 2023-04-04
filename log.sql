BEGIN TRANSACTION;
CREATE TABLE IF NOT EXISTS "posts" (
	"id"	INTEGER,
	"name"	TEXT NOT NULL,
	"year"	INTEGER,
	"rating"	INTEGER,
	"category_id"	INTEGER,
	"description"	TEXT,
	FOREIGN KEY("category_id") REFERENCES "category"("id"),
	PRIMARY KEY("id" AUTOINCREMENT)
);
CREATE TABLE IF NOT EXISTS "platforms" (
	"id"	INTEGER,
	"name"	TEXT,
	PRIMARY KEY("id" AUTOINCREMENT)
);
CREATE TABLE IF NOT EXISTS "category" (
	"id"	INTEGER,
	"name"	TEXT,
	"code"	TEXT UNIQUE,
	PRIMARY KEY("id" AUTOINCREMENT)
);
COMMIT;
