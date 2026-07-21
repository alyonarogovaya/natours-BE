const sanitizeNoSQL = (obj) => {
  if (!obj || typeof obj !== 'object') return;

  for (const key of Object.keys(obj)) {
    if (key.startsWith('$') || key.includes('.')) {
      delete obj[key];
      continue;
    }

    if (typeof obj[key] === 'object') {
      sanitizeNoSQL(obj[key]);
    }
  }
};

const sanitizeStrings = (obj) => {
  if (!obj || typeof obj !== 'object') return;

  for (const key in obj) {
    const value = obj[key];

    if (typeof value === 'string') {
      obj[key] = validator.escape(value);
    } else if (typeof value === 'object') {
      sanitizeStrings(value);
    }
  }
};

module.exports = {
  sanitizeNoSQL,
  sanitizeStrings,
};
