const productsComparator = (p1, p2) => {
  if (p1.completionStatus === p2.completionStatus) {
    return p1.createTimestamp < p2.createTimestamp;
  }
  return p1.completionStatus < p2.completionStatus;
};

export default productsComparator;
