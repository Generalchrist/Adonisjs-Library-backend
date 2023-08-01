import Database from '@ioc:Adonis/Lucid/Database'
import Book from 'App/Models/Book'

export default class BooksService {

    public static async get({ response }): Promise<Book[]> {
        const books = await Database.from('books').select('*')
        return response.json(books)
    }

    public static async create({ request }) {
        const book = request.body()
        await Database.table('books').insert(book)
        return book.id
    }

    public static async update({ request }) {
        const book = request.body()
        await Database.from('books').select('*').where('id', book.id).update(book)
    }

    public static async delete({ request }) {
        const book = request.body()
        await Database.from('books').select('*').where('id', book.id).delete()
    }
}
