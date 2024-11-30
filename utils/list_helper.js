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

function mostBlogs(blogs) {
  if (blogs.length === 0) {
    return null;
  }

  const authorBlogCounts = {};

  blogs.forEach((blog) => {
    authorBlogCounts[blog.author] = (authorBlogCounts[blog.author] || 0) + 1;
  });

  let maxAuthor = null;
  let maxBlogs = 0;

  for (const [author, count] of Object.entries(authorBlogCounts)) {
    if (count > maxBlogs) {
      maxAuthor = author;
      maxBlogs = count;
    }
  }

  return {
    author: maxAuthor,
    blogs: maxBlogs
  };
}

function mostLikes(blogs) {
  if (blogs.length === 0) {
    return null;
  }

  const authorLikesCounts = {};

  blogs.forEach((blog) => {
    authorLikesCounts[blog.author] =
      (authorLikesCounts[blog.author] || 0) + blog.likes;
  });

  let maxAuthor = null;
  let maxLikes = 0;

  for (const [author, count] of Object.entries(authorLikesCounts)) {
    if (count > maxLikes) {
      maxAuthor = author;
      maxLikes = count;
    }
  }

  return {
    author: maxAuthor,
    likes: maxLikes
  };
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
};
