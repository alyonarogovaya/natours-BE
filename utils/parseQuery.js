exports.parseQuery = (queryString) => {
  const queryObj = {};

  Object.keys(queryString).forEach((key) => {
    if (key.includes('[')) {
      const [field, operator] = key.split(/\[|\]/).filter(Boolean);

      if (!queryObj[field]) queryObj[field] = {};
      queryObj[field][operator] = queryString[key];
    } else {
      queryObj[key] = queryString[key];
    }
  });

  return queryObj;
};
