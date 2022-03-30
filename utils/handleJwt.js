const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;

/**
 * Firmar la firma o el token, para crear token para el usuario:
 * - Debes de pasar el objeto del usuario
 * @param {*} user
 */
const tokenSing = async (user) => {
  const sing = jwt.sign(
    {
      _id: user._id,
      role: user.role,
    },
    JWT_SECRET,
    {
      expiresIn: "2h",
    }
  );
  return sing;
};

/**
 * Verificar la firma del token.
 * - Debes de pasar el token de session del JWT
 * @param {*} tokenJwt
 */
const verifyToken = async (tokenJwt) => {
  try {
    return jwt.verify(tokenJwt, JWT_SECRET);
  } catch (e) {
    return null;
  }
};

module.exports = { tokenSing, verifyToken };
