const jwt = require('jsonwebtoken');

function auth(req, resp, next) {
    const authHeader = req.headers.authorization;

    if (!authHeader || authHeader.startsWith('Bearer ')) {
        return resp.status(411).json({ message: "Authorization failed" })
    }
    const token = authHeader.split(' ')[1];

    try {

        const decode = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        req.userId = decode.id;
        next();

    } catch (error) {
        console.log("🚀 ~ auth ~ error:", error)
        return resp.status(403).json({});
    }
}
module.exports = { auth };