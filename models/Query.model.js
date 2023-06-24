const mongoose = require("mongoose");

const querySchema = mongoose.Schema({
  texts: [
    {
      message: {
        type: String,
      },
      textBy: {
        type: Number,
        // 0 -> chatGPT
        // 1 -> user
      },
    },
  ],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
});

const Query = mongoose.model("Query", querySchema);

module.exports = Query;
