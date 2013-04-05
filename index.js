
module.exports = process.env.VAL_COV ? require('./lib-cov/validator').Validator : require('./lib/validator').Validator;
