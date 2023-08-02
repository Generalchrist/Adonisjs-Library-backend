import User from 'App/Models/User'
import Hash from '@ioc:Adonis/Core/Hash'
import Database from '@ioc:Adonis/Lucid/Database'
// import { DateTime } from 'luxon'
export default class AuthService {

    public static async login({ request, response, auth }) {
        const requestUser = request.body()
        const username = requestUser.username
        const password = requestUser.password

        // Lookup user manually
        const user: User = await Database.from('users').select('*').where('username', username).first()

        // Verify password
        if (!(await Hash.verify(user.password, password))) {
            return response.unauthorized('Invalid credentials')
        }



        const token = await auth.use('api').generate(user)
        token.type = 'bearer'
        token.expiresIn = 10 * 60
        return response.json(token)
    }


    // public static async register({ request , auth }) {
    //     const requestUser = request.body()
    //     const username = requestUser.username
    //     const password = requestUser.password

    //     // Create user
    //     const user = new User()
    //     user.username = username
    //     user.password = password
    //     user.createdAt = DateTime.now()
    //     user.updatedAt = DateTime.now()

    //     await user.save()



    //     const token = await auth.use('api').generate(user)
    //     token.type = 'bearer'
    //     token.expiresIn = 30 * 60
    //     return token
    // }
}