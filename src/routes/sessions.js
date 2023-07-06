import { Router } from "express";
import UserManager from "../DAO/SessionManager/session.js"
import authMiddleware from "../middlewares/auth.js";

const sessionsRouter = Router();

const userManager = new UserManager

sessionsRouter.get("/login", (req, res)=>{
    res.render("login", {})
})

sessionsRouter.get("/register", (req,res)=>{
    res.render("register", {})
})

sessionsRouter.post("/login", async (req, res)=>{
    let user = req.body
    let result = await userManager.getByEmail(user.user)
    if (user.password !== result.password) {
        res.render("login-error", {})
        return
    }
    req.session.user = user.user
     res.render("perfil", {user: result.first_name})
})

sessionsRouter.post("/register", async (req,res)=>{
    let user = req.body
    let result = await userManager.createUser(user)
    res.render("login", {})
})

sessionsRouter.get("/perfil", authMiddleware, async (req, res)=>{
    let user = await userManager.getByEmail(req.session.user)
    res.render("perfil", {user: user.first_name})
})

sessionsRouter.get('/logout', (req, res) => {
    req.session.destroy(error => {
        res.render('login')
    })
})

export default sessionsRouter;