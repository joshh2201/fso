const mongoose = require('mongoose');

mongoose.set('strictQuery', false);
const url = process.env.MONGODB_URI;

console.log('connecting to ', url);

mongoose
  .connect(url)
  .then(() => {
    console.log('connected to mongodb');
  })
  .catch((error) => {
    console.log('could not connect', error.message);
  });

const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number,
});

module.exports = mongoose.model('Blog', blogSchema);
