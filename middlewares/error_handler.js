let Errors = require("../errors");

let errorHandler = async (err, req, res) => {
  if (err instanceof Errors.CustomError) {
    return res.status(err.statusCode).json({ msg: err.message });
  }

  return res.status(500).json({ msg: `Internal server error` });
};

module.exports = errorHandler;
