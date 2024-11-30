const Blog = require('../models/blog');

const initialBlogs = [
  {
    title: 'How to find',
    author: 'Muhammad Asif',
    url: 'example.com',
    likes: 100
  },
  {
    title: 'How to find something',
    author: 'Muhammad Asim',
    url: 'google.com',
    likes: 150
  }
];

const nonExistingId = async () => {
  const blog = new Blog({
    author: 'willremovethissoon',
    title: 'New material',
    url: 'dummy.com',
    likes: 10
  });
  await blog.save();
  await blog.deleteOne();

  return blog._id.toString();
};

const blogsInDb = async () => {
  const blogs = await Blog.find({});
  return blogs.map((blog) => blog.toJSON());
};

module.exports = {
  initialBlogs,
  nonExistingId,
  blogsInDb
};
