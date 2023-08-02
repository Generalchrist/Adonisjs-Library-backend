import BooksService from "App/Services/BooksService"

export default class BooksController {


    public async get({response}) {
        await BooksService.get({response})
    }
    
    public async create({request}) {
        await BooksService.create({request})
    }

    public async update({request}) {
        await BooksService.update({request})
    }

    public async delete({params}) {
        await BooksService.delete({params})
    }

}
