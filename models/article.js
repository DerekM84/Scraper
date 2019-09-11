var mongoose = require("mongoose");



// Schema constructor, create a new UserSchema object

var Schema = mongoose.Schema;
var ArticleSchema = new Schema({

  headline: {
    type: String,
    required: true
  },

  link: {
    type: String,
    required: true
  },

  time: {
      type: String,
      required: true
  },

  author: {
       type: String,
       required: true,
  },

  img: {
      type:String,
      required:true,
  },

  // `note` is an object that stores a Note id
  // The ref property links the ObjectId to the Note model
  // This allows us to populate the Article with an associated Note
  note: {
    type: Schema.Types.ObjectId,
    ref: "Note"
  }
});

// create the model
var Article = mongoose.model("Article", ArticleSchema);
var Saved = mongoose.model("Saved", ArticleSchema);
module.exports = Article,Saved;
