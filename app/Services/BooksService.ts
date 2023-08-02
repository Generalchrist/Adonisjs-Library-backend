import Drive from '@ioc:Adonis/Core/Drive';
import Database from '@ioc:Adonis/Lucid/Database'
import Book from 'App/Models/Book'
import Application from '@ioc:Adonis/Core/Application'

export default class BooksService {

    public static async get({ response }): Promise<Book[]> {
        const books = await Database.from('books').select('*')
        return response.json(books)
    }

    public static async create({ request }) {
        const book = request.all()
        const cover_photo = request.file('cover_photo')

        if (cover_photo) {
            const fileName = `${new Date().getTime()}.${cover_photo.extname}`
            await cover_photo.move(Application.publicPath('uploads'), {
                name: fileName
            })
            book.cover_photo = `uploads/${fileName}`
        }

        await Database.table('books').insert(book)
        return book.id
    }

    public static async update({ request }) {
        const book = request.all()
        const cover_photo = request.file('cover_photo')


        if (cover_photo) {
            const fileName = `${new Date().getTime()}.${cover_photo.extname}`
            await cover_photo.move(Application.publicPath('uploads'), {
                name: fileName
            })
            book.cover_photo = `uploads/${fileName}`
        }

        await Database.from('books').select('*').where('id', book.id).update(book)
    }

    public static async delete({ params }) {
        const id = params.id

        const book = await Database.from('books').select('*').where('id', id).first()

        console.log(book.cover_photo)
        
        if (book.cover_photo) {
            // its not working
            // await Drive.delete(Application.publicPath(book.cover_photo))

            // its working
            await Drive.delete(Application.publicPath(`uploads/${book.cover_photo}`))
        }



        await Database.from('books').select('*').where('id', id).delete()
    }
}
