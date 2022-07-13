const error405 = (req, res, next) => {
  res.status(405).send(`The ${req.method} method for the "${req.originalUrl}" route is not supported.`);
};

exports.error405 = error405;
