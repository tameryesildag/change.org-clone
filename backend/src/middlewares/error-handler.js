export default async function(err, req, res, next) {
    let code = 500;
    res.status(code).json({error: err.message});
    next();
}