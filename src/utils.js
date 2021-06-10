// lodash utils

function baseOrderBy(collection, iteratees, orders) {
  if (iteratees.length) {
    iteratees = iteratees.map((iteratee) => {
      if (Array.isArray(iteratee)) {
        return (value) =>
          baseGet(value, iteratee.length === 1 ? iteratee[0] : iteratee);
      }

      return iteratee;
    });
  } else {
    iteratees = [identity];
  }

  let criteriaIndex = -1;
  let eachIndex = -1;

  const result = isArrayLike(collection) ? new Array(collection.length) : [];

  baseEach(collection, (value) => {
    const criteria = iteratees.map((iteratee) => iteratee(value));

    result[++eachIndex] = {
      criteria,
      index: ++criteriaIndex,
      value,
    };
  });

  return baseSortBy(result, (object, other) =>
    compareMultiple(object, other, orders)
  );
}

export const filter = (array, predicate) => {
  let index = -1;
  let resIndex = 0;
  const length = array == null ? 0 : array.length;
  const result = [];
  while (++index < length) {
    const value = array[index];
    if (predicate(value, index, array)) {
      result[resIndex++] = value;
    }
  }
  return result;
};


export const orderBy = (collection, iteratees, orders) => {
  if (collection == null) {
    return [];
  }
  if (!Array.isArray(iteratees)) {
    iteratees = iteratees == null ? [] : [iteratees];
  }
  if (!Array.isArray(orders)) {
    orders = orders == null ? [] : [orders];
  }
  return baseOrderBy(collection, iteratees, orders);
};