import { Router } from "express";
import authMiddleware from "../middlewares/auth.js";
import passport from "passport";

const sessionsRouter = Router();

sessionsRouter.get("/register", (req,res)=>{
    res.render("register", {})
})

sessionsRouter.post("/register", passport.authenticate('register', {failureRedirect:"api/sessions/failregister"}), async (req,res)=>{
    res.render("login", {})
})

sessionsRouter.get("/failregister", (req, res)=>{
    res.render("register-error", {})
})


sessionsRouter.get("/login", (req, res)=>{
    res.render("login", {})
})

sessionsRouter.post("/login", passport.authenticate('login', { failureRedirect: "/api/sessions/faillogin" }), async (req, res) => {
    if (!req.user) {
        return res.render("login-error", {});
    }
    req.session.user = req.user.email;
    return res.render("perfil", { user: req.session.user });
});


sessionsRouter.get("/faillogin", (req, res)=>{
    res.render("login-error", {})
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