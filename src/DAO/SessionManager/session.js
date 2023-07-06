import { userModel } from "../models/User.model.js";

class UserManager {
    constructor(){
        this.model = userModel
    }

    async getAll() {
        let result;
        try {
            result = await this.model.find()
        } catch (error) {
            console.log(error)
        }
        return result
    };

    async getByEmail(email) {
        let result;
        try {
            result = await this.model.findOne({ email })
        } catch (error) {
            console.log(error)
        }
        return result
    };

    async createUser (user) {
        let result;
        try {
            result = await userModel.create(user)
        } catch (error) {
            console.log(error)
        }
        return result;
    }
}

export default UserManager