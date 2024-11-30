const { test, after, beforeEach } = require('node:test');
const mongoose = require('mongoose');
const supertest = require('supertest');
const assert = require('node:assert');
const helper = require('./test_helper');

const app = require('../app');

const Blogs = require('../models/blog');

const api = supertest(app);

beforeEach(async () => {
  await Blogs.deleteMany({});

  for (let blog of helper.initialBlogs) {
    let blogObject = new Blogs(blog);
    await blogObject.save();
  }
});

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/);
});

test('there are two blogs', async () => {
  const response = await api.get('/api/blogs');
  console.log('response of the request', response);

  assert.strictEqual(response.body.length, helper.initialBlogs.length);
});

test('there are two blogs with unique id', async () => {
  const response = helper.blogsInDb();

  (await response).forEach((blog) => {
    assert.ok(blog.id, `if id exist for ${blog}`);
  });
});

test('the first blogs is about HTTP methods', async () => {
  const response = await api.get('/api/blogs');

  const authors = response.body.map((e) => e.author);
  assert(authors.includes('Muhammad Asif'));
});

test('a valid blog can be added ', async () => {
  const newBlog = {
    title: 'How to find new thing',
    author: 'Suleman',
    url: 'gmail.com',
    likes: 300
  };

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/);

  const blogsAtEnd = await helper.blogsInDb();
  assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1);
  const authors = blogsAtEnd.map((r) => r.author);
  assert(authors.includes(newBlog.author));
});

test('a blog can be added event likes not present in request body', async () => {
  const newBlog = {
    title: 'How to find new thing',
    author: 'Suleman',
    url: 'gmail.com'
  };

  const result = await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/);

  const blogsAtEnd = await helper.blogsInDb();
  assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1);
  const authors = blogsAtEnd.map((r) => r.author);
  assert(authors.includes(newBlog.author));
  assert.equal(result.body.likes, 0);
});

test.only('a blog cannot be added event likes with title and author', async () => {
  const newBlog = {
    url: 'gmail.com'
  };

  await api.post('/api/blogs').send(newBlog).expect(400);

  const blogsAtEnd = await helper.blogsInDb();
  assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length);
});

// test.only('blog without author is not added', async () => {
//   const newBlog = {
//     likes: 100
//   };

//   const response = await api.post('/api/blogs').send(newBlog).expect(201);

//   console.log('response', response);

//   const blogsAtEnd = await helper.blogsInDb();

//   assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length);
// });

after(async () => {
  await mongoose.connection.close();
});
