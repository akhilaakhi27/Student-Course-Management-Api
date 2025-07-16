const jwt = require('jsonwebtoken');

const protect = (roles = []) => {
  return (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'No token, not authorized' });
    }

    const token = authHeader.split(' ')[1];

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Save decoded user data in request
      req.user = decoded;

      // Role-based check
      if (roles.length > 0 && !roles.includes(decoded.role)) {
        return res.status(403).json({ message: 'Access denied: insufficient role' });
      }

      next(); // go to the next function
    } catch (error) {
      return res.status(401).json({ message: 'Token invalid or expired' });
    }
  };
};

module.exports = protect;
