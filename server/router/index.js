const express = require("express");
const router = express.Router();
const dotenv = require("dotenv");
const { v4: uuidv4 } = require("uuid");
const Multer = require("multer");
const { resizeAndUpload } = require("./services/image-resize.js");
const { googleUpload } = require("./services/google-cloud-upload.js");
const UserModel = require("../db/model/UserModel.js");
const { saveUser, getUser, findAndUpdate } = require("./services/user-controller.js");
const multer = Multer({
  storage: Multer.memoryStorage(),
  limits: {
    fileSize: 1 * 1024 * 1024,
  },
});

const { put, createPresignedUrlWithoutClient } = require("./services/s3-upload.js");
dotenv.config();

router.post("/upload", multer.single("file"), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file provided" });
  }

  if (!req.body.id) {
    return res.status(400).json({ error: "No user id provided" });
  }

  try {
    const user = await getUser(req.body.id);
    const file = req.file;
    const fileName = file.originalname;
    const fileKey = uuidv4();
    const bucket = process.env.AWS_BUCKET_NAME;
    const region = process.env.AWS_REGION;

    const signedUrl = await createPresignedUrlWithoutClient({
      region,
      bucket,
      key: `${user.local_id}-${fileName}`,
    });

    // await Promise.all([
    //   await put(signedUrl, file.buffer),
    //   await resizeAndUpload(
    //     file.buffer,
    //     {
    //       width: 150,
    //       height: 150,
    //       fit: "cover",
    //     },
    //     googleUpload,
    //     fileName
    //   ),
    // ]);
    await put(signedUrl, file.buffer);
    await resizeAndUpload(
      file.buffer,
      {
        width: 150,
        height: 150,
        fit: "cover",
      },
      googleUpload,
      fileName
    );

    const junkdrawer_images = user.junkdrawer_images;
    junkdrawer_images[fileKey] = {
      id: fileKey,
      likes: 0,
      name: fileName, // file name
    };

    await findAndUpdate(req.body.id, { junkdrawer_images });

    res.status(200).json({ signedUrl, bucketKey: fileName });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to upload image." });
  }
});

router.get("/user/:userId", async (req, res) => {
  if (!req.params?.userId) {
    return res.status(400).json({ error: "User ID is required but missing." });
  }

  const userId = req.params.userId;
  const user = await getUser(userId);
  if (user) {
    return res.status(200).json(user);
  } else {
    return res.status(201).json({});
  }
});

router.post("/user", async (req, res) => {
  if (!req.body) {
    return res.status(400).json({ error: "User object not sent." });
  }
  const userObject = { ...req.body };
  userObject.local_id = uuidv4(); // Save user with new local id
  return await saveUser(userObject, res);
});

module.exports = router;
