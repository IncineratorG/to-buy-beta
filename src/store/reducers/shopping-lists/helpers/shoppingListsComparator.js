const shoppingListsComparator = (s1, s2) => {
  return s1.updateTimestamp < s2.updateTimestamp;
};

export default shoppingListsComparator;
