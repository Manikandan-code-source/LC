const logger = (req,res,next) => {
    console.log("Custome middleware Called");
    req.requestedAt = new Date().toISOString();
    next();
}

module.exports=logger;