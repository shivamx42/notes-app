import jwt from 'jsonwebtoken';

export const verifyUser = (req, res, next) => {
  const token = req.cookies.access_token;

  if (!token) return res.status(400).json({message: "Error"});

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(400).json({message: "Error"});

    req.user = user;
    next();
  });
};