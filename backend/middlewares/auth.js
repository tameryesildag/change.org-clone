import jwt from "jsonwebtoken";

export default async function checkAuth(req, res, next){
    const token = req.get("token");
    if(!token) return next();
    try{
        const decodedToken = jwt.verify(token, process.env.PRIVATE_KEY);
        req.userId = decodedToken.userId;
        next();
    } catch(err) {
        return next();
    }
}