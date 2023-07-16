const { S3RequestPresigner } = require("@aws-sdk/s3-request-presigner");
const { fromIni } = require("@aws-sdk/credential-providers");
const { HttpRequest } = require("@aws-sdk/protocol-http");
const { formatUrl } = require("@aws-sdk/util-format-url");
const { parseUrl } = require("@aws-sdk/url-parser");
const { Hash } = require("@aws-sdk/hash-node");
const https = require("https");

// https://github.com/awsdocs/aws-doc-sdk-examples/blob/main/javascriptv3/example_code/s3/scenarios/presigned-url-upload.js#L45

function put(url, data) {
  return new Promise((resolve, reject) => {
    const req = https.request(
      url,
      { method: "PUT", headers: { "Content-Length": Buffer.byteLength(data) } },
      (res) => {
        let responseBody = "";
        res.on("data", (chunk) => (responseBody += chunk));
        res.on("end", () => resolve(responseBody));
        console.log("successfully uploaded to s3");
      }
    );
    req.on("error", (err) => reject(err));
    req.write(data);
    req.end();
  });
}

const createPresignedUrlWithoutClient = async ({ region, bucket, key }) => {
  const url = parseUrl(`https://${bucket}.s3.${region}.amazonaws.com/${key}`);
  const presigner = new S3RequestPresigner({
    credentials: fromIni(),
    region,
    sha256: Hash.bind(null, "sha256"),
  });

  const signedUrlObject = await presigner.presign(new HttpRequest({ ...url, method: "PUT" }));
  return formatUrl(signedUrlObject);
};

module.exports = { put, createPresignedUrlWithoutClient };
