const File = require("../file/file.model");
const Share = require("../share/share.model");
const mongoose = require("mongoose");
const ApiError = require("../../utils/ApiError");

const getFileStats = async (ownerId) => {
  const stats = await File.aggregate([
    {
      $match: {
        ownerId: new mongoose.Types.ObjectId(ownerId),
      },
    },
    {
      $facet: {
        summary: [
          {
            $group: {
              _id: null,
              totalFiles: { $sum: 1 },
              totalStorageUsed: { $sum: "$size" },
              averageFileSize: { $avg: "$size" },
            },
          },
        ],
        fileTypes: [
          {
            $group: {
              _id: "$mimeType",
              count: { $sum: 1 },
              totalSize: { $sum: "$size" },
            },
          },
          {
            $project: {
              _id: 0,
              mimeType: "$_id",
              count: 1,
              totalSize: 1,
            },
          },
          {
            $sort: { count: -1 },
          },
        ],
      },
    },
  ]);

  return {
    summary: stats[0].summary[0] || {
      totalFiles: 0,
      totalStorageUsed: 0,
      averageFileSize: 0,
    },
    fileTypes: stats[0].fileTypes || [],
  };
};

const getDownlaodStats = async ({ ownerId, fileId }) => {
  const file = await File.findById(fileId);

  if (!file) {
    throw new ApiError(401, "file not found");
  }

  if (file.ownerId.toString() !== ownerId.toString()) {
    throw new ApiError(403, "Not Allowed");
  }

  const stats = await Share.aggregate([
    {
      $match: {
        ownerId: new mongoose.Types.ObjectId(ownerId),
        fileId: new mongoose.Types.ObjectId(fileId),
      },
    },
    {
      $group: {
        _id: "$fileId",
        totalDownloads: { $sum: "$downloadCounts" },
       
      },
    },
    {
      $project: {
        _id: 0,
        fileId: "$_id",
        totalDownloads: 1,
      },
    },
  ]);
  return (
    stats[0] || {
      totalDownloads: 0,
    }
  );
};

module.exports = { getFileStats, getDownlaodStats };
