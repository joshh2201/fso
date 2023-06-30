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
  return topAuthor
    ? { author: topAuthor, blogs: authorCounts[topAuthor] }
    : null;
};

const mostLikes = (blogs) => {
  const authors = _.groupBy(blogs, 'author');
  const authorLikes = _.mapValues(authors, (author) =>
    _.sumBy(author, 'likes')
  );
  const topAuthor = _.maxBy(
    _.keys(authorLikes),
    (author) => authorLikes[author]
  );
  return topAuthor
    ? { author: topAuthor, likes: authorLikes[topAuthor] }
    : null;
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
