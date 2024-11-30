const dummy = (blogs) => {
  console.log('blogs', blogs);
  return 1;
};

const totalLikes = (blogs) => {
  let sum = 0;
  blogs?.reduce((prev, current) => {
    sum += current.likes;
  }, sum)
  return sum;
}

module.exports = {
  dummy,
  totalLikes,
};
