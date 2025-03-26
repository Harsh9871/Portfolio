const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

exports.authMiddleware =async (req,res,next)=>{
    const authHeader = req.headers.authorization;
    const JWT_SECRET = process.env.JWT_SECRET ;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ success: false, message: 'Unauthorized: No token provided' });
    }

    const token = authHeader.split(' ')[1];
    try {
        req.user = jwt.verify(token, JWT_SECRET);
        next();
    } catch (error) {
        return res.status(403).json({ success: false, message: 'Invalid or expired token' });
    }
}