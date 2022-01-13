const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      maxlength: 30,
    },
    color: {
      type: String,
    },

    icon: {
      type: String,
    },
    imageBackground: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

categorySchema.method("toJSON", function () {
  const { __v, ...object } = this.toObject();
  const { _id: id, ...result } = object;
  return { ...result, id };
});

module.exports = mongoose.model("Category", categorySchema);
