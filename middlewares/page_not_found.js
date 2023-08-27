let pageNotFound = (req, res) => {
  return res.status(404).json({ msg: `Page not found` });
};

module.exports = pageNotFound;
