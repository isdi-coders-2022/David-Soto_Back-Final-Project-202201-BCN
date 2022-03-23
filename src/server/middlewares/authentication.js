const jwt = require("jsonwebtoken");

// eslint-disable-next-line consistent-return
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) {
    return res.sendStatus(401);
  }

  // eslint-disable-next-line consistent-return
  jwt.verify(token, process.env.API_KEY, (err, user) => {
    if (err) return res.sendStatus(403);

    req.user = user;
    next();
  });
};

module.exports = authenticateToken;
