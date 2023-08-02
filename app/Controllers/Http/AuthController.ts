import AuthService from "App/Services/AuthService";

export default class AuthController {

    public async login({ request , response , auth }) {
        await AuthService.login({ request , response , auth })
    }

    // public async register({ request , auth }) {
    //     await AuthService.register({ request , auth })
    // }


}
