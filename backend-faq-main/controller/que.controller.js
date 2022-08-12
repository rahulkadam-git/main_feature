const Queries = require("../Model/Model");
const Comments = require("../Model/comment.model");
const { queryMail } = require("../helper");

exports.query = async (req, res) => {
  try {
    if (!req.body) {
      return res.status(200).json("error found");
    }
    const Query = new Queries(req.body);
    const userQuery = await Query.save();
    if (userQuery) {
      let response = queryMail(req.body);
      return res.status(200).json(response);
    } else {
      return res.status(500).json("query could not register");
    }
  } catch (error) {
    return res.status(400).json("something went wrong");
  }
};

exports.allQuery = async (req, res) => {
  try {
    const usersAllQueries = await Queries.find(req.params);
    return res.status(200).json(usersAllQueries);
  } catch (error) {
    return res.status(400).json("something went wrong");
  }
};

exports.getQueryFromID = async (req, res) => {
  try {
    const requestedQuery = await Queries.findOne(req.params).populate(
      "comments"
    );
    console.log(requestedQuery);
    return res.status(200).json(requestedQuery);
  } catch (error) {
    return res.status(400).json("something went wrong");
  }
};

exports.queryComments = async (req, res) => {
  try {
    const { queryId } = req.body;
    const newComments = new Comments(req.body.comment);
    const AddedComment = await newComments.save();
    console.log(AddedComment);
    const queryAdded = await Queries.findByIdAndUpdate(
      queryId,
      { $push: { comments: AddedComment._id } },
      { new: true }
    );

    return res.status(200).json(queryAdded);
  } catch (error) {
    return res.status(400).json("something went wrong");
  }
};
