const File = require("../file/file.model");
const ApiError = require("../../utils/ApiError");
const generateShareToken = require("../../utils/generateToken");
const Share = require("../share/share.model");

const createShareLink = async ({ fileId, ownerId }) => {
  const file = await File.findById(fileId);

  if (!file) {
    throw new ApiError(404, "File not found");
  }

  if (file.ownerId.toString() !== ownerId.toString()) {
    throw new ApiError(403, "Not Allowed");
  }

  const token = generateShareToken();

  const record = await Share.create({
    fileId,
    ownerId,
    token,
    expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
  });

  return { record, shareUrl: `${process.env.BASE_URL}share/${token}` };
};

module.exports = { createShareLink };
