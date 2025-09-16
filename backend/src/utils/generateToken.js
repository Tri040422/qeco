import jwt from "jsonwebtoken";

const generateToken = (payload, secret, expiresIn) => {
  return jwt.sign(payload, secret, { expiresIn });
};

export default generateToken;
