const express = require('express');
require('dotenv').config();
const cors = require('cors');
const Blog = require('./models/blog.js');

const app = express();
app.use(cors());
app.use(express.json());

app.get('/api/blogs', (request, response) => {
  Blog.find({}).then((blogs) => {
    response.json(blogs);
  });
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
