const File = require("../file/file.model")
const mongoose = require("mongoose");

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

module.exports = { getFileStats };
