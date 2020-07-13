const unitsComparator = (u1, u2) => {
  return u1.createTimestamp < u2.createTimestamp;
};

export default unitsComparator;
