const sharp = require("sharp");

/**
 * Resize image and pass it to the callback function
 * @param {*} fileBuffer
 * @param {*} options - sharp options, w, h etc
 * @param {*} callback - pass the buffer to the callback for further processing
 */
async function resizeAndUpload(fileBuffer, options, callback, fileName) {
  sharp(fileBuffer)
    .resize(options)
    .toBuffer(async (err, resizedBuffer) => {
      if (err) {
        console.error("Error resizing image:", err);
        return;
      }

      await callback(resizedBuffer, fileName);
    });
}

module.exports = { resizeAndUpload };
