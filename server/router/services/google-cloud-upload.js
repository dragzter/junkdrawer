const { Storage } = require("@google-cloud/storage");
const dotenv = require("dotenv");
const path = require("path");
const src = path.join(__dirname);
dotenv.config();

const storage = new Storage({
  projectId: process.env.GOOGLE_PROJ_ID,
  keyFilename: `${src}/js-key-file.json`,
});
const bucket = storage.bucket(process.env.GOOGLE_BUCKET);

async function googleUpload(fileBuffer, fileName) {
  const blob = bucket.file(fileName);
  const blobStream = blob.createWriteStream();

  blobStream.on("finish", () => {
    console.log("Success!");
  });

  blobStream.end(fileBuffer);
}

module.exports = { googleUpload };
