const jwt = require('jsonwebtoken');
const secret = 'INCROYABLEFOODSTATS4^(a8^=zgm!FN%nM#e.8~(L-m88#-5F9BY?|)8Hb/A-%}';
const makeDbQuery = require("../makeDbQuery.js");

const withAuth = function(req, res, next) {
  const token =
      req.body.token ||
      req.query.token ||
      req.headers['x-access-token'] ||
      req.cookies.token;

  if (!token) {
    res.status(401).send('Unauthorized: No token provided');
  } else {
    jwt.verify(token, secret, async function(err, decoded) {
      if (err) {
        console.log("invalid token");
      } else {
        req.username = decoded.username;
        var result = await makeDbQuery(`select * from login where username=\'${req.username}\'`)
        if (!result[0]){
          res.status(401).send('Unauthorized: Your Username Changed.');
        } else if(result[0].banned == 1) {
          res.status(401).send('Unauthorized: Banned');
        }
        next();
      }
    });
  }
}

module.exports = withAuth;