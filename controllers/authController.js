const makeDbQuery = require("../makeDbQuery.js");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const secret = `INCROYABLEFOODSTATS4^(a8^=zgm!FN%nM#e.8~(L-m88#-5F9BY?|)8Hb/A-%}`;

exports.check = (req, res) => {
  res.sendStatus(200);
}

exports.login = async (req, res) => {
  const { username, password } = req.body;

  var result2 = await makeDbQuery(`select * from login where username=\'${username}\'`)

  if (!result2[0]) {
    console.log("Incorrect username or password")
    res.status(401)
      .json({
      error: 'Incorrect username or password'
    });
  } else {
    bcrypt.compare(password, result2[0].password, function(err, result) {
      if (result) {
        const payload = { username };
        const token = jwt.sign(payload, secret, {
          expiresIn: '30d'
        });
        res.json({
          success: true,
          message: "Authentication successful",
          token
        })
      } else {
        res.status(401)
        .json({
          error: 'Incorrect username or password'
        });
      }
    });
  }
}

exports.register = async (req, res) => {
  const { username, password } = req.body;
  const querySelect = `select * from login where username=\'${username}\'`
  var resultSelect = await makeDbQuery(querySelect);
  if (resultSelect[0]){
    return res.status(401)
      .json({
        error: 'Username already exists.'
    });
  }
  bcrypt.hash(password, saltRounds, async function(err, hash) {
    const query = `insert into login (username, password) values('${username}', '${hash}')`
    await makeDbQuery(query);
    res.status(200)
        .json({
          success: true
        });
  });
}