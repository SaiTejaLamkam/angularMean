var jwt = require('jsonwebtoken');
var config = require('./index');

// export default function (app) {
//     console.log(app.get('superSecret'), '88888888');
//     var token = req.body.token || req.query.token || req.headers['authorization'];
//   if (!token)
//     return res.status(403).send({ auth: false, message: 'No token provided.' });
//   jwt.verify(token, app.get('superSecret'), function(err, decoded) {
//     if (err)
//     return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
//     // if everything good, save to request for use in other routes
//     req.userId = decoded.id;
//     next();
//   });
// }
function verifyToken(app, req, res, next) {
    console.log(app.get('superSecret'), '88888888');
    var token = req.body.token || req.query.token || req.headers['authorization'];
  if (!token)
    return res.status(403).send({ auth: false, message: 'No token provided.' });
  jwt.verify(token, config.superSecret, function(err, decoded) {
    if (err)
    return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
    // if everything good, save to request for use in other routes
    console.log('hiiiiiiiiiiiiiii');
    req.userId = decoded.id;
    next();
  });
}
module.exports = verifyToken;