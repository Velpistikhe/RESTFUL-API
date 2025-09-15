const jwt = require("jsonwebtoken");
const cookieOptions = require("../config/cookieOptions");

const verifyToken = (req, res, next) => {
  const token = req.cookies.Authorization?.split(" ")[1];

  if (!token)
    return res.status(200).json({ success: false, status: "Unauthorized!" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded;

    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      res.clearCookie("Authorization", cookieOptions);

      return res.status(401).json({
        success: false,
        message: "Sesi telah berakhir, silahkan login kembali",
      });
    }

    if (error.name === "JsonWebTokenError") {
      return res
        .status(401)
        .json({ success: false, message: "Invalid Credentials" });
    }

    return res.status(401).json({ success: false, message: "Invalid Token" });
  }
};

module.exports = verifyToken;
