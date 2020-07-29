const shoppingListsComparator = (s1, s2) => {
  return s1.createTimestamp < s2.createTimestamp;
};

export default shoppingListsComparator;
