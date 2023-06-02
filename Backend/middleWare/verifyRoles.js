
const jwt = require("jsonwebtoken")

const isAuth = (req, res, next) => {
    const token = req.headers.authorization || req.headers.Authorization;
  
    if (token) {
      const onlyToken = token.slice(7, token.length);
      jwt.verify(onlyToken, process.env.JWT_ACCESS_TOKEN, (err, decode) => {
        if (err) {
          return res.status(401).json({ message: 'Sign In First' , error : true });
        }
        console.log("Decode ",decode)
        req.user = decode;
        next();
        return;
      });
    } else {
      return res.status(401).json({ message: 'Sign In first.' , error : true });
    }
  };


  const isAdmin = (req, res, next) => {
    console.log(req.user);
    if (req.user && req.user.isAdmin) {
      return next();
    }
    return res.status(401).send({ message: 'Admin Token is Not valid' , error : true });
  };

module.exports = {isAuth , isAdmin}