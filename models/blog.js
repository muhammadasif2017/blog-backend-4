const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  url: {
    type: String
  },
  likes: {
    type: Number,
    default: 0
  }
});

blogSchema.set('toJSON', {
  transform: (document, returedObject) => {
    returedObject.id = returedObject._id.toString();
    delete returedObject._id;
    delete returedObject.__v;
  }
});

module.exports = mongoose.model('Blog', blogSchema);
