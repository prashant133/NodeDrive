const uploadOnCloudinary = require("../../config/cloudinary");
const ApiError = require("../../utils/ApiError");
const File = require("./file.model");
const cloudinary = require("cloudinary").v2;

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

const deleteFiles = async ({ ownerId, fileId }) => {
  const file = await File.findById(fileId);

  if (!file) {
    throw new ApiError(404, "File not found");
  }

  console.log(file);

  if (file.ownerId.toString() != ownerId.toString()) {
    throw new ApiError(401, "Not allowed");
  }

  await cloudinary.uploader.destroy(file.storedName);

  const deletedFiles = await File.findByIdAndDelete(file);

  return deletedFiles;
};

const getMyFiles = async ({ ownerId }) => {
  return await File.find({ ownerId }).sort({ createdAt: -1 });
};

const downloadFile = async ({ ownerId, fileId }) => {
  const file = await File.findById(fileId);

  if (!file) {
    throw new ApiError(404, "file not found");
  }

  if (file.ownerId.toString() !== ownerId) {
    throw new ApiError(403, "Not allowed");
  }

  return file.path;
};

module.exports = { fileUpload, deleteFiles, getMyFiles, downloadFile };
