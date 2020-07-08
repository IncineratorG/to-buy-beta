const categoriesComparator = (c1, c2) => {
  return c1.createTimestamp < c2.createTimestamp;
};

export default categoriesComparator;
