import AuthService from "App/Services/AuthService";

export default class AuthController {

    public async login({ request }) {
        await AuthService.login(request)
    }

}
