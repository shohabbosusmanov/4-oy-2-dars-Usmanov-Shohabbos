import BookService from "../services/book.service.js";
import CustomError from "../utils/custom_error.js";

export default class BookController {
    constructor() {
        this.bookService = new BookService();
    }

    async getAll(req, res, next) {
        try {
            const books = await this.bookService.getAll();

            res.status(200).json(books);
        } catch (error) {
            next(error);
        }
    }

    async getOne(req, res, next) {
        try {
            const id = req.params.id;

            const book = await this.bookService.getOne(id);

            res.status(200).json(book);
        } catch (error) {
            next(error);
        }
    }

    async create(req, res, next) {
        try {
            const data = req.body;

            const book = await this.bookService.create({
                ...data,
                user_id: req.user_id,
            });

            res.status(201).json({ message: "success", book });
        } catch (error) {
            next(error);
        }
    }

    async update(req, res, next) {
        try {
            const id = req.params.id;

            const data = req.body;

            const book = await this.bookService.findById(id);

            if (!book) {
                throw new CustomError("book not found", 404);
            }

            if (book.user_id != req.user_id)
                throw new CustomError("forbidden", 403);

            const updatedBook = await this.bookService.update(id, data);

            res.status(200).json({ message: "success", updatedBook });
        } catch (error) {
            next(error);
        }
    }

    async delete(req, res, next) {
        try {
            const id = req.params.id;

            const book = await this.bookService.findById(id);

            if (!book) {
                throw new CustomError("book not found", 404);
            }

            if (book.user_id != req.user_id)
                throw new CustomError("forbidden", 403);

            const deletedBook = await this.bookService.delete(id);

            res.status(200).json({ message: "success", deletedBook });
        } catch (error) {
            next(error);
        }
    }
}
