const jwt = require("jsonwebtoken");
const jwtMiddleware = (req, res, next) => {
  //token is passed from client to server via request headers
  // in aurthorization key in request headers

  //Bearer ertyssuunsshnhssimsilssj
  // we user bearer token here,so we neeed to remove the bearer
  // keyword and seperate toke from it
  //since it is tring ,we converted it into an array using split method
  //and we will get token from the 1st index

  let token = req.headers.authorization.split(" ")[1];

  try {
    if (token) {
      let decodeData = jwt.verify(token, process.env.jwtSecretKey);
      if (decodeData) {
        //next and update the req
        req.user = decodeData.email;
        next();
      } else {
        res.status(401).json({ message: "Invalid Token ,please login" });
      }
    } else {
      res.status(401).json({ message: "Token is Requird ,please login" });
    }
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({
        message:
          "Something went wrong while validating token,please try login again",
      });
  }
};
module.exports=jwtMiddleware