const mongoose = require("mongoose");
const mongooseDelete = require("mongoose-delete");

const TracksScheme = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    album: {
      type: String,
    },
    cover: {
      type: String,
      validate: {
        validator: (req) => {
          return true;
        },
        message: "ERROR_URL",
      },
    },
    artist: {
      name: {
        type: String,
      },
      nickname: {
        type: String,
      },
      nationality: {
        type: String,
      },
    },
    duration: {
      start: {
        type: Number,
      },
      end: {
        type: Number,
      },
    },
    mediaId: {
      type: mongoose.Types.ObjectId,
    },
  },
  {
    timestamps: true, //TODO createdAt, updatedAt - fecha de actualizacion
    versionKey: false,
  }
);

/**
 * Implementar metodo propio con relacion a storage
 * @param {*} name
 * @returns
 */
TracksScheme.statics.findAllData = function (name) {
  const joinData = this.aggregate([
    // modelo Tracks
    {
      $lookup: {
        from: "storages", // Relacion a storages
        localField: "mediaId", // Campo de la tabla mediaId
        foreignField: "_id", // relacion a Storages._id
        as: "audio", // Nombre de la relacion, su alias
      },
    },
    { $unwind: "$audio" },
  ]);
  return joinData;
};

TracksScheme.statics.findOneData = function (id) {
  const joinData = this.aggregate([
    // modelo Tracks
    { $match: { _id: mongoose.Types.ObjectId(id) } },
    {
      $lookup: {
        from: "storages", // Relacion a storages
        localField: "mediaId", // Campo de la tabla mediaId
        foreignField: "_id", // relacion a Storages._id
        as: "audio", // Nombre de la relacion, su alias
      },
    },
    { $unwind: "$audio" },
  ]);
  return joinData;
};

TracksScheme.plugin(mongooseDelete, { overrideMethods: "all" });
module.exports = mongoose.model("tracks", TracksScheme);
