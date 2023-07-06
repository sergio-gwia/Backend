export const authMiddleware = (req, res, next) => {
    if(req.session.user){
        next()
    }else{
        res.render('login', { status: 'failed'})
    }
}

export default authMiddleware