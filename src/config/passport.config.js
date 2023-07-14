import passport from "passport";
import local from "passport-local";
import UserManager from "../DAO/SessionManager/session.js";
import { createHash, isValidPassword } from "../utils.js";

let manager = new UserManager;

const LocalStrategy = local.Strategy;

const initializePassport = () => {

    passport.use("register", new LocalStrategy(
        {passReqToCallback: true, usernameField: "email"}, async (req, username, password, done)=>{
            try {
              let user = req.body
              let userFound = await manager.getByEmail(user.email)
              if (userFound) {
                return done(null, false)
              }
            user.password = createHash(password)
            let result = await manager.createUser(user)

            return done(null, result)
            
            } catch (error) {
                return done("error al obtener usuario")
            }
        }
    ))
    
    passport.use("login", new LocalStrategy(
        { passReqToCallback: true, usernameField: "email" }, async (username, password, done) => {
            let result = await manager.getByEmail(username);
            if (!result || !isValidPassword(result, password)) { 
                return done(null, false);
            }

            delete result.password;
                
            return done(null, result);  
        }
    ));
    

    passport.serializeUser((user, done)=>{
        done(null, user._id)
    })

    passport.deserializeUser(async(id, done)=>{
        let user = await manager.getById(id);
        done(null, user)
    })
}

export default initializePassport

