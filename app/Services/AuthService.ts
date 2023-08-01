import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'


export default class AuthService {


    public static async login({ auth, request }: HttpContextContract) {
        const loginmodel = request.body()
        const email = loginmodel.email
        const password = loginmodel.password
        await auth.attempt(email, password)
    }

}