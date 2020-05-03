const oss = require("ali-oss");
const fs = require("fs");
const ossConfig = require("./oss.config");
const { potrace, SQIP } = require("./imageConverter");

/**
 *  interface ossConfig {
 *      accessKeyId:String,
 *      accessKeySecret:String,
 *      bucket:String,
 *      region:String
 *  }
 */

const client = oss(ossConfig);

module.exports.handler = async function (eventBuf, ctx, callback) {
  try {
    console.log("Received event:", eventBuf.toString());
    const event = JSON.parse(eventBuf);
    const ossEvent = event.events[0];
    const ossObjectKey = ossEvent.oss.object.key;
    const fileName = ossObjectKey.match(/([^/]+)\.[A-Za-z]+$/)[1];
    const tempFile = await downLoadFile(ossObjectKey);
    const convertedImageBuffer = await potrace.potraceImage(tempFile);
    await putImage(convertedImageBuffer, fileName);
    callback(null);
  } catch (err) {
    callback(err);
  }
};

const downLoadFile = async (ossObjectKey) => {
  try {
    const fileData = await client.get(ossObjectKey);
    const tempFile = "/tmp.png";
    // console.log("fileData", fileData);
    fs.writeFileSync(tempFile, fileData.content);
    return tempFile;
  } catch (e) {
    throw new Error(e);
  }
};

const putImage = async (convertedImageBuffer, fileName) => {
  const start = new Date().getTime();
  try {
    const data = convertedImageBuffer;
    const destPath = "primitiveImage/" + fileName + ".svg";

    //object-name可以自定义为文件名（例如file.txt）或目录（例如abc/test/file.txt）的形式，实现将文件上传至当前Bucket或Bucket下的指定目录。
    let result = await client.put(destPath, data);
    // console.log(result);
  } catch (e) {
    throw new Error(e);
  }
  const end = new Date().getTime();
  console.log("convert time:", end - start);
};


// local test 
// const name = "test/tmp.png";
// downLoadFile(name).then((res) =>
//   putImage(res, name.match(/([^/]+)\.[A-Za-z]+$/)[1])
// );