export default async function(err, req, res, next) {
    let code = err.code || 500;
    if(code == 500){
        console.log(err);
    }
    res.status(code).json({error: err.message});
}