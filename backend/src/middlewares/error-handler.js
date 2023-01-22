export default async function(err, req, res, next) {
    console.log(err);
    let code = 500;
    res.status(code).json({error: err.message});
    next();
}