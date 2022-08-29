const Validate = (schema) => async (req, res, next) => {
    try {
  
      Object.keys(schema).forEach(key => {
          let reqKey = ['params', 'query'].includes(key) ? 'filter' : 'data';
          const currentSchema = schema[key];
  
          const result = currentSchema.cast(currentSchema.validateSync(req[key]));
  
          req[reqKey] = result;
      });
  
      next();
    } catch(e) {
      return res.status(401).json({ error: e.message });
  }
  };
  
module.exports = Validate;