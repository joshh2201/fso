const _ = require('lodash');

const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  const reducer = (total, blog) => (total += blog.likes);
  return blogs.reduce(reducer, 0);
};
const favoriteBlog = (blogs) => {
  const reducer = (currFav, blog) => {
    if (!currFav || currFav.likes < blog.likes) {
      currFav = blog;
    }
    return currFav;
  };
  return blogs.reduce(reducer, null);
};

const mostBlogs = (blogs) => {
  const authorCounts = _.countBy(blogs, 'author');
  const topAuthor = _.maxBy(
    _.keys(authorCounts),
    (author) => authorCounts[author]
  );
  return { author: topAuthor, blogs: authorCounts[topAuthor] };
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
};
