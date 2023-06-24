const Query = require("../models/Query.model");
const { createCompletionChatGTP } = require("../ChatGPt");
const { v4: uuid } = require("uuid");
require("dotenv").config()
exports.chat = async (req, res) => {
  try {
    console.log(process.env.OPENAI_API_KEY);
    console.log(req.body.message);

    let query = await Query.findOne({ user: req.body.userId });

    if (!query) {
      query = new Query({
        user: req.body.userId,
        texts: [{ message: req.body.message, textBy: 1 }],
      });
    } else {
      query.texts.push({ message: req.body.message, textBy: 1 });
    }

    const { data } = await createCompletionChatGTP({
      message: req.body.message,
    });

    let contentArray = data.choices[0]?.text.split("\n");
    let content = contentArray[2];

    query.texts.push({ message: content, textBy: 0 });

    await query.save();

    res.send({
      message: content,
      _id: query.user,
    });
  } catch (err) {
    res.status(400).send({ success: false, message: err.message });
  }
};

exports.getAllChats = async (req, res) => {
  try {
    const query = await Query.findOne({ _id:  req.body.userID});
    if (!query)
      return res
        .status(400)
        .send({ success: false, message: "Query doesn't exist" });
    res.send(query);
  } catch (err) {
    res.status(400).send({ success: false, message: err.message });
  }
};
