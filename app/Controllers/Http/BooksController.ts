import Book from "App/Models/Book"
import BooksService from "App/Services/BooksService"

export default class BooksController {


    public async get({ response, auth }) {
        await BooksService.get({ response, auth })
    }

    public async create({ request, auth }) {
        const bookData = request.body()
        const cover_photo = request.file('cover_photo')
        bookData.cover_photo = cover_photo
        await BooksService.create({ auth }, bookData)


    }

    public async update({ request, auth }) {
        const bookData = request.body()
        const cover_photo = request.file('cover_photo')
        bookData.cover_photo = cover_photo
        await BooksService.update({ auth }, bookData)
    }

    public async delete({ params, auth }) {
        await BooksService.delete({ params, auth })
    }

}





