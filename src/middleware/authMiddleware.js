import jwt from "jsonwebtoken"

function authMiddleware (req, res, next){
    const tok = req.headers('authorization')
    if(!tok){
        return res.status(401).json({message : 'no token provided'})
    }
    jwt.verify(tok, process.env.JWT_SECRET, (err, decoded)=>{
        if(err){
            return res.status(401).json({message : 'invalid token'})
        }
        req.userId = decoded.id
        next()
    })
}

export default authMiddleware