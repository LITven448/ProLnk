import mysql from "mysql2/promise";
const conn = await mysql.createConnection(process.env.DATABASE_URL);

await conn.execute(`
  CREATE TABLE IF NOT EXISTS forumPosts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    partnerId INT NOT NULL,
    category VARCHAR(50) NOT NULL DEFAULT 'general',
    title VARCHAR(255) NOT NULL,
    body TEXT NOT NULL,
    likes INT NOT NULL DEFAULT 0,
    pinned TINYINT(1) NOT NULL DEFAULT 0,
    createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
  )
`);
console.log("✅ forumPosts created");

await conn.execute(`
  CREATE TABLE IF NOT EXISTS forumReplies (
    id INT AUTO_INCREMENT PRIMARY KEY,
    postId INT NOT NULL,
    partnerId INT NOT NULL,
    body TEXT NOT NULL,
    createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
  )
`);
console.log("✅ forumReplies created");

await conn.execute(`
  CREATE TABLE IF NOT EXISTS forumLikes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    postId INT NOT NULL,
    partnerId INT NOT NULL,
    createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    UNIQUE KEY uniq_like (postId, partnerId)
  )
`);
console.log("✅ forumLikes created");

await conn.execute(`
  CREATE TABLE IF NOT EXISTS partnerGalleryProjects (
    id INT AUTO_INCREMENT PRIMARY KEY,
    partnerId INT NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    category VARCHAR(100),
    beforeImageUrl TEXT,
    afterImageUrl TEXT,
    completedAt DATETIME,
    createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
  )
`);
console.log("✅ partnerGalleryProjects created");

await conn.end();
console.log("Done!");
