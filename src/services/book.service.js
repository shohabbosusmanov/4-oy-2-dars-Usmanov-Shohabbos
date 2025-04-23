import { prisma } from "../app.js";
import CustomError from "../utils/custom_error.js";
import ValidationService from "./validation.service.js";

export default class BookService {
    constructor() {
        this.validationService = new ValidationService();
    }

    async getAll() {
        const books = await prisma.book.findMany();

        return books;
    }

    async getOne(id) {
        const book = await prisma.book.findUnique({ where: { id } });

        if (!book) throw new CustomError("book not found", 404);

        return book;
    }

    async create(data) {
        await this.validationService.bookValidation(data);

        const book = await prisma.book.create({ data });

        return book;
    }

    async update(id, data) {
        const updatedBook = await prisma.book.update({ where: { id }, data });

        return updatedBook;
    }

    async delete(id) {
        const deletedBook = await prisma.book.delete({ where: { id } });

        return deletedBook;
    }

    async findById(id) {
        const book = await prisma.book.findUnique({ where: { id } });

        return book;
    }
}
