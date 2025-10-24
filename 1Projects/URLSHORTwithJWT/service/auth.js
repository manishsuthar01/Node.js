const jwt = require("jsonwebtoken");
const secretKey = "manish@78775dev"; // spelling fixed too

// create token
function setUser(user) {
  return jwt.sign(
    { _id: user._id, email: user.email, role: user.role },
    secretKey,
    {
      expiresIn: "1h",
    }
  );
}

// verify token
function getUser(token) {
  if (!token) return null; // prevent "jwt must be provided" error
  try {
    return jwt.verify(token, secretKey);
  } catch (err) {
    return null; // return null if invalid or expired
  }
}

module.exports = {
  getUser,
  setUser,
};
