const uploadOnCloudinary = require("../../config/cloudinary");
const ApiError = require("../../utils/ApiError");
const File = require("./file.model");

const fileUpload = async ({ files, ownerId }) => {
  if (!files || files.length === 0) {
    throw new Error("No files uploaded");
  }
  const uploadedFiles = [];

  for (const file of files) {
    const cloudFile = await uploadOnCloudinary(file.path, "NodeDrive");
    if (!cloudFile) continue;

    const savedFile = await File.create({
      ownerId,
      originalName: file.originalname,
      storedName: cloudFile.public_id,
      mimeType: file.mimetype,
      size: file.size,
      path: cloudFile.secure_url,
    });
    uploadedFiles.push(savedFile);
  }
  return uploadedFiles;
};

module.exports = { fileUpload };
