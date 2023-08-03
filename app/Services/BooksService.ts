import Drive from '@ioc:Adonis/Core/Drive';
import Database from '@ioc:Adonis/Lucid/Database'
import Book from 'App/Models/Book'
import Application from '@ioc:Adonis/Core/Application'
import ActivityLogService from './ActivityLogService';
import ActivityLogModel from 'App/Models/ActivityLogModel';
import * as fs from 'node:fs/promises';
export default class BooksService {

    public static async get({ response, auth }): Promise<Book[]> {
        await auth.use('api').authenticate()
        const books = await Database.from('books').select('*')
        return response.json(books)
    }

    public static async create({ auth }, bookData) {
        await auth.use('api').authenticate()
        const book = bookData
        const cover_photo = book.cover_photo

        if (cover_photo) {
            const fileName = `${new Date().getTime()}.${cover_photo.extname}`
            await cover_photo.move(Application.publicPath('uploads'), {
                name: fileName
            })
            book.cover_photo = `uploads/${fileName}`
        }

        await Database.table('books').insert(book)
        // activity Logs
        var activityLogModel = new ActivityLogModel()
        activityLogModel.id = Math.floor(Math.random() * 1000) + 1
        activityLogModel.user_id = auth.user.id
        activityLogModel.book_id = book.id
        activityLogModel.activity_type = 'BookCreated'

        await ActivityLogService.createActivityLog(activityLogModel)
        return book.id
    }

    public static async update({ auth }, bookData) {
        await auth.use('api').authenticate()
        const book = bookData
        const cover_photo = book.cover_photo
        
        const oldBook = await Database.from('books').select('*').where('id', book.id).first()

        if (cover_photo != null) {
            const fileName = `${new Date().getTime()}.${cover_photo.extname}`
            await cover_photo.move(Application.publicPath('uploads'), {
                name: fileName
            })
            book.cover_photo = `uploads/${fileName}`
        }
        if(book.name == null) book.name = oldBook.name
        if(book.author == null) book.author = oldBook.author
        if(cover_photo == null) book.cover_photo = oldBook.cover_photo

        await Database.from('books').select('*').where('id', book.id).update(book).then(() => {
            var activityLogModel = new ActivityLogModel()
            activityLogModel.id = Math.floor(Math.random() * 1000) + 1
            activityLogModel.user_id = auth.user.id
            activityLogModel.book_id = book.id
            activityLogModel.activity_type = 'BookEdited'
    
            ActivityLogService.createActivityLog(activityLogModel)

            if(oldBook.cover_photo != null && oldBook.cover_photo != book.cover_photo)
            fs.unlink(Application.publicPath(oldBook.cover_photo))

        })


    }

    public static async delete({ params, auth }) {
        await auth.use('api').authenticate()
        const id = params.id

        const book = await Database.from('books').select('*').where('id', id).first()
        const photoPath = book.cover_photo

        await Database.from('books').select('*').where('id', id).delete().then(() => {

            var activityLogModel = new ActivityLogModel()
            activityLogModel.id = Math.floor(Math.random() * 1000) + 1
            activityLogModel.user_id = auth.user.id
            activityLogModel.book_id = book.id
            activityLogModel.activity_type = 'BookDeleted'

            ActivityLogService.createActivityLog(activityLogModel)

            if (photoPath) {
                const fileLocation = Application.publicPath(photoPath)
                fs.unlink(fileLocation)
            }
        })

    }
}
