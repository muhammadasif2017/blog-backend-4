const dummy = (blogs) => {
  console.log('blogs', blogs);
  return 1;
};

const totalLikes = (blogs) => {
  let sum = 0;
  blogs?.reduce((prev, current) => {
    sum += current.likes;
  }, sum);
  return sum;
};

const favoriteBlog = (blogs) => {
  let higestRatedBlog = null;
  for (const blog of blogs) {
    if (!higestRatedBlog) {
      higestRatedBlog = blog;
    } else if (blog.likes > higestRatedBlog.likes) {
      higestRatedBlog = blog;
    }
  }
  return higestRatedBlog;
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
};
